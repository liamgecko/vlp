import CarouselSection from "@/components/Carousel";
import { getContentBlocks, CarouselBlock as CarouselBlockType } from "@/lib/wp";

interface CarouselBlockProps {
  pageSlug: string;
}

const CarouselBlockComponent = async ({ pageSlug }: CarouselBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first carousel block
    const carouselBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksCarouselLayout');

    if (!carouselBlockData) {
      return null; // Don't render anything if no carousel block found
    }

    // Transform the WordPress data to match the CarouselSection component props
    const carouselBlock: CarouselBlockType = {
      heading: carouselBlockData.heading,
      introContent: carouselBlockData.introContent,
      carouselImages: carouselBlockData.carouselImages,
    };

    // Safely handle the carouselImages
    let slides: Array<{ src: string; alt: string }> = [];
    if (Array.isArray(carouselBlock.carouselImages)) {
      slides = carouselBlock.carouselImages.map(image => ({
        src: image.sourceUrl,
        alt: image.altText || 'Carousel image'
      }));
    } else if (carouselBlock.carouselImages && typeof carouselBlock.carouselImages === 'object' && 'nodes' in carouselBlock.carouselImages) {
      slides = carouselBlock.carouselImages.nodes.map(image => ({
        src: image.sourceUrl,
        alt: image.altText || 'Carousel image'
      }));
    }

    return (
      <CarouselSection
        title={carouselBlock.heading || ''}
        description={carouselBlock.introContent || ''}
        slides={slides}
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
    );
  } catch (error) {
    console.error('Error in CarouselBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default CarouselBlockComponent;
