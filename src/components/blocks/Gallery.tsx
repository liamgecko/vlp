import Gallery from "@/components/Gallery";
import { getContentBlocks, GalleryBlock as GalleryBlockType } from "@/lib/wp";

interface GalleryBlockProps {
  pageSlug: string;
  blockColourClass?: string;
}

const GalleryBlockComponent = async ({ pageSlug, blockColourClass }: GalleryBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first gallery block
    const galleryBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksGalleryLayout');

    if (!galleryBlockData) {
      return null; // Don't render anything if no gallery block found
    }

    // Transform the WordPress data to match the Gallery component props
    const galleryBlock: GalleryBlockType = {
      introHeading: galleryBlockData.introHeading,
      introContent: galleryBlockData.introContent,
      galleryImages: galleryBlockData.galleryImages,
    };

    // Safely handle the galleryImages
    let images: Array<{ src: string; alt: string; width: number; height: number; title: string }> = [];
    if (Array.isArray(galleryBlock.galleryImages)) {
      images = galleryBlock.galleryImages.map((imageItem: any) => ({
        src: imageItem.node.sourceUrl,
        alt: imageItem.node.altText || 'Gallery image',
        width: imageItem.node.mediaDetails?.width || 800,
        height: imageItem.node.mediaDetails?.height || 600,
        title: imageItem.node.altText || 'Gallery image'
      }));
    } else if (galleryBlock.galleryImages && typeof galleryBlock.galleryImages === 'object' && 'nodes' in galleryBlock.galleryImages) {
      // If it's an object with nodes property
      const imageNodes = galleryBlock.galleryImages.nodes || [];
      images = imageNodes.map((imageItem: any) => ({
        src: imageItem.sourceUrl,
        alt: imageItem.altText || 'Gallery image',
        width: imageItem.mediaDetails?.width || 800,
        height: imageItem.mediaDetails?.height || 600,
        title: imageItem.altText || 'Gallery image'
      }));
    }

    return (
      <Gallery
        title={galleryBlock.introHeading || ''}
        description={galleryBlock.introContent || ''}
        images={images}
        className={blockColourClass || "bg-[#FFF4EB]"}
      />
    );
  } catch (error) {
    console.error('Error in GalleryBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default GalleryBlockComponent;
