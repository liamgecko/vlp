import Video from "@/components/Video";
import { getContentBlocks, VideoBlock } from "@/lib/wp";

interface VideoBlockProps {
  pageSlug: string;
  blockColourClass?: string;
}

const VideoBlockComponent = async ({ pageSlug, blockColourClass }: VideoBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);
    
    // Find the first video block
    const videoBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksVideoLayout');

    if (!videoBlockData) {
      return null; // Don't render anything if no video block found
    }

    // Cast to VideoBlock type
    const videoBlock: VideoBlock = {
      introHeading: videoBlockData.introHeading,
      introContent: videoBlockData.introContent,
      videoUrl: videoBlockData.videoUrl,
      blockColour: videoBlockData.blockColour,
    };

    return (
      <Video
        title={videoBlock.introHeading || ''}
        description={videoBlock.introContent || ''}
        videoUrl={videoBlock.videoUrl || ''}
        blockColourClass={blockColourClass}
      />
    );
  } catch (error) {
    console.error('Error in VideoBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default VideoBlockComponent;
