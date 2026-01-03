import PricingBlock from "@/components/PricingBlock";
import { getContentBlocks, PricingTableBlock as PricingTableBlockType, PricingCard } from "@/lib/wp";

interface PricingTableBlockProps {
  pageSlug: string;
  blockColourClass?: string;
}

const PricingTableBlockComponent = async ({ pageSlug, blockColourClass }: PricingTableBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first pricing table block
    const pricingTableBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksPricingTableLayout');

    if (!pricingTableBlockData) {
      return null; // Don't render anything if no pricing table block found
    }

    // Transform the WordPress data to match the PricingBlock component props
    const pricingTableBlock: PricingTableBlockType = {
      introHeading: pricingTableBlockData.introHeading,
      introContent: pricingTableBlockData.introContent,
      pricingCards: pricingTableBlockData.pricingCards,
      customPricing: pricingTableBlockData.customPricing,
    };

    return (
      <PricingBlock
        title={pricingTableBlock.introHeading || ''}
        description={pricingTableBlock.introContent || ''}
        tiers={pricingTableBlock.pricingCards?.map((cardItem: { card?: PricingCard }, index: number) => ({
          id: `card-${index}`,
          name: cardItem.card?.packageTitle || '',
          price: cardItem.card?.packageCost || '',
          period: '', // No period field in ACF, so empty
          description: cardItem.card?.packageDescription || '',
          features: [], // Features can be included in description as HTML
          buttonText: cardItem.card?.buttonLink?.title || 'Enquire about this package',
          buttonLink: cardItem.card?.buttonLink?.url || '#'
        })) || []}
        customPricing={pricingTableBlock.customPricing}
        className={blockColourClass || "bg-blush-300"}
      />
    );
  } catch (error) {
    console.error('Error in PricingTableBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default PricingTableBlockComponent;
