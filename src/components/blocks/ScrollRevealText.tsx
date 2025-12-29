import { TestimonialSection } from "@/components/ScrollRevealText";
import { getContentBlocks, TestimonialBlock as TestimonialBlockType } from "@/lib/wp";

interface TestimonialBlockProps {
  pageSlug: string;
}

const TestimonialBlockComponent = async ({ pageSlug }: TestimonialBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first testimonial block
    const testimonialBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksTestimonialLayout');

    if (!testimonialBlockData) {
      return null; // Don't render anything if no testimonial block found
    }

    // Transform the WordPress data to match the TestimonialSection component props
    const testimonialBlock: TestimonialBlockType = {
      quote: testimonialBlockData.quote,
      reviewerName: testimonialBlockData.reviewerName,
      backgroundImage: testimonialBlockData.backgroundImage,
    };

    return (
      <TestimonialSection
        heading={testimonialBlock.quote || ''}
        author={testimonialBlock.reviewerName ? `— ${testimonialBlock.reviewerName}` : undefined}
        backgroundImage={testimonialBlock.backgroundImage?.node?.sourceUrl || '/vlp-01.jpg'}
        className=""
      />
    );
  } catch (error) {
    console.error('Error in TestimonialBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default TestimonialBlockComponent;
