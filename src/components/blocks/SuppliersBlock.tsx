import SuppliersList from '@/components/SuppliersList';
import { getContentBlocks, SuppliersGridBlock } from '@/lib/wp';

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
      console.log('No suppliers block found');
      return null;
    }

    if (!suppliersBlock?.supplier) {
      console.log('No suppliers data found');
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

    console.log('Transformed suppliers:', suppliers);

    return (
      <SuppliersList
        suppliers={suppliers}
        title={suppliersBlock.introHeading || ""}
        description="Discover trusted wedding suppliers who have worked with us to create beautiful celebrations. Each supplier has been carefully selected for their quality, reliability, and commitment to making your day perfect."
        className={blockColourClass}
      />
    );
  } catch (error) {
    console.error('Error fetching suppliers data:', error);
    return null;
  }
};

export default SuppliersBlock;
