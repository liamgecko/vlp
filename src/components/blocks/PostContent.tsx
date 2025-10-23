"use client";

import { useEffect, useState, useRef } from 'react';

interface PostContentProps {
  content: string;
  className?: string;
}

const PostContent = ({ content, className = "" }: PostContentProps) => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && containerRef.current) {
      try {
        // Debug: Log content to console
        console.log('PostContent: Content received:', content);
      
      // Check if content contains PicTime script but no iframe
      const hasPicTimeScript = content.includes('data-pt-scriptslideshowid');
      const hasIframe = content.includes('<iframe');
      
      if (hasPicTimeScript && !hasIframe) {
        console.log('PostContent: PicTime script detected but no iframe found. Creating direct iframe fallback.');
        // Extract slideshow ID from content
        const scriptMatch = content.match(/data-pt-scriptslideshowid='([^']+)'/);
        if (scriptMatch && scriptMatch[1]) {
          const slideshowId = scriptMatch[1];
          console.log('PostContent: Extracted slideshow ID:', slideshowId);
          
          // Create direct iframe with proper error handling
          try {
            const directIframe = document.createElement('iframe');
            directIframe.src = `https://victoriaphotography.pic-time.com/-engagementphotoshootsinscotland/slideshow/${slideshowId}`;
            directIframe.width = '100%';
            directIframe.height = '600';
            directIframe.frameBorder = '0';
            directIframe.allowFullscreen = true;
            directIframe.style.border = 'none';
            directIframe.style.borderRadius = '8px';
            directIframe.style.margin = '20px 0';
            
            // Add error handling for iframe
            directIframe.onerror = (error) => {
              console.error('PostContent: Iframe failed to load:', error);
            };
            
            directIframe.onload = () => {
              console.log('PostContent: Direct iframe loaded successfully');
            };
            
            // Insert at the beginning of the content
            if (containerRef.current) {
              containerRef.current.prepend(directIframe);
              console.log('PostContent: Direct iframe created and inserted');
            }
          } catch (error) {
            console.error('PostContent: Error creating iframe:', error);
          }
        }
      }
      
      // Handle external scripts that need to be executed
      const executeExternalScripts = () => {
        const scripts = containerRef.current?.querySelectorAll('script[data-pt-scriptslideshowid]');
        console.log('PostContent: Found PicTime scripts:', scripts?.length || 0);
        
        if (scripts && scripts.length > 0) {
          scripts.forEach((script, index) => {
            const scriptElement = script as HTMLScriptElement;
            console.log(`PostContent: Processing script ${index}:`, scriptElement.src);
            
            // Create a new script element
            const newScript = document.createElement('script');
            newScript.src = scriptElement.src || '';
            newScript.type = 'text/javascript';
            newScript.async = true;
            newScript.defer = true;
            
            // Copy all data attributes
            Array.from(script.attributes).forEach(attr => {
              if (attr.name.startsWith('data-')) {
                newScript.setAttribute(attr.name, attr.value);
              }
            });
            
            // Add error handling
            newScript.onerror = (error) => {
              console.error('PostContent: Script failed to load:', error);
              // Try to create a fallback iframe if the script fails
              createFallbackIframe(script);
            };
            
            newScript.onload = () => {
              console.log('PostContent: Script loaded successfully');
            };
            
            // Add to head and execute
            document.head.appendChild(newScript);
            
            // Clean up the original script
            script.remove();
          });
        }
        
        // Also check for iframes
        const iframes = containerRef.current?.querySelectorAll('iframe');
        console.log('PostContent: Found iframes:', iframes?.length || 0);
        iframes?.forEach((iframe, index) => {
          console.log(`PostContent: Iframe ${index}:`, iframe.src);
        });
        
        // If no iframes found after script execution, wait a bit and check again
        if (!iframes || iframes.length === 0) {
          setTimeout(() => {
            const delayedIframes = containerRef.current?.querySelectorAll('iframe');
            console.log('PostContent: Delayed iframe check - Found iframes:', delayedIframes?.length || 0);
            if (delayedIframes && delayedIframes.length === 0) {
              console.warn('PostContent: No iframes created by PicTime script. This might be due to content blockers.');
            }
          }, 2000);
        }
      };
      
      // Fallback function to create iframe if script fails
      const createFallbackIframe = (script: Element) => {
        const scriptSrc = script.getAttribute('src');
        if (scriptSrc) {
          // Extract the slideshow ID from the script URL
          const slideshowId = script.getAttribute('data-pt-scriptslideshowid');
          if (slideshowId) {
            console.log('PostContent: Creating fallback iframe for slideshow:', slideshowId);
            const fallbackIframe = document.createElement('iframe');
            fallbackIframe.src = `https://victoriaphotography.pic-time.com/-engagementphotoshootsinscotland/slideshow/${slideshowId}`;
            fallbackIframe.width = '100%';
            fallbackIframe.height = '600';
            fallbackIframe.frameBorder = '0';
            fallbackIframe.allowFullscreen = true;
            fallbackIframe.style.border = 'none';
            fallbackIframe.style.borderRadius = '8px';
            
            // Insert the iframe where the script was
            script.parentNode?.insertBefore(fallbackIframe, script);
          }
        }
      };

        // Execute scripts after a short delay to ensure DOM is ready
        const timeoutId = setTimeout(executeExternalScripts, 100);
        
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error('PostContent: Error in useEffect:', error);
      }
    }
  }, [isClient, content]);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div className={`${className} animate-pulse`}>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ minHeight: '400px' }}
    />
  );
};

export default PostContent;
