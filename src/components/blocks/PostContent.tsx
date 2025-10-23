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
      // Debug: Log content to console
      console.log('PostContent: Content received:', content);
      
      // Handle external scripts that need to be executed
      const executeExternalScripts = () => {
        const scripts = containerRef.current?.querySelectorAll('script[data-pt-scriptslideshowid]');
        console.log('PostContent: Found PicTime scripts:', scripts.length);
        
        if (scripts) {
          scripts.forEach(script => {
            // Create a new script element
            const newScript = document.createElement('script');
            newScript.src = script.getAttribute('src') || '';
            newScript.type = 'text/javascript';
            
            // Copy all data attributes
            Array.from(script.attributes).forEach(attr => {
              if (attr.name.startsWith('data-')) {
                newScript.setAttribute(attr.name, attr.value);
              }
            });
            
            // Add to head and execute
            document.head.appendChild(newScript);
            
            // Clean up the original script
            script.remove();
          });
        }
        
        // Also check for iframes
        const iframes = containerRef.current?.querySelectorAll('iframe');
        console.log('PostContent: Found iframes:', iframes.length);
        iframes.forEach((iframe, index) => {
          console.log(`PostContent: Iframe ${index}:`, iframe.src);
        });
      };

      // Execute scripts after a short delay to ensure DOM is ready
      const timeoutId = setTimeout(executeExternalScripts, 100);
      
      return () => clearTimeout(timeoutId);
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
