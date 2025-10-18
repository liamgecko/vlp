import ImageTextCarousel from "@/components/ImageTextCarousel";
import { getContentBlocks, ImageTextCarouselBlock as ImageTextCarouselBlockType } from "@/lib/wp";

interface ImageTextCarouselBlockProps {
  pageSlug: string;
}

const ImageTextCarouselBlockComponent = async ({ pageSlug }: ImageTextCarouselBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first image text carousel block
    const imageTextCarouselBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksTextCarouselLayout');

    if (!imageTextCarouselBlockData) {
      return null; // Don't render anything if no image text carousel block found
    }

    // Transform the WordPress data to match the ImageTextCarousel component props
    const imageTextCarouselBlock: ImageTextCarouselBlockType = {
      introHeading: imageTextCarouselBlockData.introHeading,
      introContent: imageTextCarouselBlockData.introContent,
      carouselItems: imageTextCarouselBlockData.carouselItems,
    };

    return (
      <ImageTextCarousel
        heading={imageTextCarouselBlock.introHeading || ''}
        description={imageTextCarouselBlock.introContent || ''}
        slides={imageTextCarouselBlock.carouselItems?.map(carouselItem => ({
          imageSrc: carouselItem.item?.itemImage?.node?.sourceUrl || '/vlp-01.jpg',
          imageAlt: carouselItem.item?.itemImage?.node?.altText || carouselItem.item?.itemHeading || 'Carousel image',
          title: carouselItem.item?.itemHeading || '',
          description: carouselItem.item?.itemContent || '',
        })) || []}
        showHeading={true}
        autoplay={true}
        showNavigation={true}
      />
    );
  } catch (error) {
    console.error('Error in ImageTextCarouselBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default ImageTextCarouselBlockComponent;
