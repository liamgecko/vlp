import TextBlock from "@/components/TextBlock";
import { getContentBlocks, TextBlock as TextBlockType } from "@/lib/wp";

interface TextBlockProps {
  pageSlug: string;
  blockColourClass?: string;
}

const TextBlockComponent = async ({ pageSlug, blockColourClass }: TextBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first text block
    const textBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksTextBlockLayout');

    if (!textBlockData) {
      return null; // Don't render anything if no text block found
    }

    // Transform the WordPress data to match the TextBlock component props
    const textBlock: TextBlockType = {
      content: textBlockData.content,
    };

    return (
      <TextBlock
        content={textBlock.content || ''}
        className={blockColourClass || "bg-sunflower-50"}
      />
    );
  } catch (error) {
    console.error('Error in TextBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default TextBlockComponent;
