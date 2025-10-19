import SuppliersList from '@/components/SuppliersList';
import { getContentBlocks, SuppliersGridBlock } from '@/lib/wp';

// Shared utility function for block colour mapping
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

interface SuppliersBlockProps {
  pageSlug: string;
  blockColourClass?: string;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  description: string;
  website?: string;
}

const SuppliersBlock: React.FC<SuppliersBlockProps> = async ({ 
  pageSlug, 
  blockColourClass = '' 
}) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);
    const suppliersBlock = contentBlocks.find(
      block => block.__typename === 'ContentBlocksContainerContentBlocksSuppliersGridLayout'
    ) as SuppliersGridBlock | undefined;

    if (!suppliersBlock) {
      return null;
    }

    if (!suppliersBlock?.supplier) {
      return null;
    }

    // Transform WordPress data to match SuppliersList component format
    const suppliers: Supplier[] = (suppliersBlock.supplier || []).map((supplier, index) => ({
      id: `supplier-${index}`,
      name: supplier.supplierName || '',
      category: supplier.supplierCategory || '',
      image: supplier.supplierImage?.node?.sourceUrl || '',
      imageAlt: supplier.supplierImage?.node?.altText || '',
      description: supplier.supplierDescription || '',
      website: supplier.supplierWebsite || undefined,
    }));


    // Get the block colour class from WordPress data or fallback to prop
    const finalBlockColourClass = getBlockColourClass(suppliersBlock.blockColour) || blockColourClass || '';

    return (
      <section className={`suppliers-block w-full py-20 lg:py-32 ${finalBlockColourClass}`}>
        {/* Intro Content */}
        {(suppliersBlock.introHeading || suppliersBlock.introContent) && (
          <div className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              {suppliersBlock.introHeading && (
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-midnight-950 mb-6">
                  {suppliersBlock.introHeading}
                </h2>
              )}
              {suppliersBlock.introContent && (
                <div 
                  className="prose prose-lg max-w-none text-midnight-700"
                  dangerouslySetInnerHTML={{ __html: suppliersBlock.introContent }}
                />
              )}
            </div>
          </div>
        )}
        
        <SuppliersList
          suppliers={suppliers}
          className=""
        />
      </section>
    );
  } catch (error) {
    console.error('Error fetching suppliers data:', error);
    return null;
  }
};

export default SuppliersBlock;
