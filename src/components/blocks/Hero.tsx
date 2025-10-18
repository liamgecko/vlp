import Hero from "@/components/Hero";
import { getContentBlocks, HeroBlock } from "@/lib/wp";

interface HeroBlockProps {
  pageSlug: string;
}

const HeroBlockComponent = async ({ pageSlug }: HeroBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);
    
    // Find the first hero block
    const heroBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksHeroBlockLayout');

    if (!heroBlockData) {
      return null; // Don't render anything if no hero block found
    }

    // Cast to HeroBlock type
    const heroBlock: HeroBlock = {
      heroHeading: heroBlockData.heroHeading,
      heroImage: heroBlockData.heroImage,
      heroSubHeading: heroBlockData.heroSubHeading,
      primaryButton: heroBlockData.primaryButton,
      secondaryButton: heroBlockData.secondaryButton,
    };

    return <Hero heroData={heroBlock} />;
  } catch (error) {
    console.error('Error in HeroBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default HeroBlockComponent;
