import ImageText from "@/components/ImageText";
import { getContentBlocks, ImageTextBlock } from "@/lib/wp";

interface ImageTextBlockProps {
  pageSlug: string;
}

const ImageTextBlockComponent = async ({ pageSlug }: ImageTextBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);
    
    // Find the first image text block
    const imageTextBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksImageWithTextLayout');

    if (!imageTextBlockData) {
      return null; // Don't render anything if no image text block found
    }

    // Cast to ImageTextBlock type
    const imageTextBlock: ImageTextBlock = {
      heading: imageTextBlockData.heading,
      content: imageTextBlockData.content,
      image: imageTextBlockData.image,
      video: imageTextBlockData.video,
      imagePosition: imageTextBlockData.imagePosition,
      buttonLink: imageTextBlockData.buttonLink,
      blockColour: imageTextBlockData.blockColour,
    };



    // Map block colour to CSS class
    const getBlockColourClass = (blockColour?: string | string[]) => {
      if (!blockColour) return '';
      
      // Handle array case (ACF sometimes returns arrays)
      const colourValue = Array.isArray(blockColour) ? blockColour[0] : blockColour;
      
      const colourMap: Record<string, string> = {
        'sunflower_solid': 'block-sunflower-solid',
        'sunflower_gradient': 'block-sunflower-gradient',
        'peach_solid': 'block-peach-solid',
        'peach_gradient': 'block-peach-gradient',
        'blush_solid': 'block-blush-solid',
        'blush_gradient': 'block-blush-gradient',
        'violet_solid': 'block-violet-solid',
        'violet_gradient': 'block-violet-gradient',
        'midnight_solid': 'block-midnight-solid',
        'midnight_gradient': 'block-midnight-gradient',
      };
      
      return colourMap[colourValue] || '';
    };

    return (
      <ImageText
        title={imageTextBlock.heading || ''}
        description={imageTextBlock.content || ''}
        imageSrc={imageTextBlock.image?.node?.sourceUrl}
        imageAlt={imageTextBlock.image?.node?.altText || imageTextBlock.heading || ''}
        videoUrl={imageTextBlock.video || ''}
        variant={imageTextBlock.imagePosition === 'left' ? 'left' : 'right'}
        buttonText={imageTextBlock.buttonLink?.title}
        buttonLink={imageTextBlock.buttonLink?.url}
        blockColourClass={getBlockColourClass(imageTextBlock.blockColour)}
      />
    );
  } catch (error) {
    console.error('Error in ImageTextBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default ImageTextBlockComponent;
