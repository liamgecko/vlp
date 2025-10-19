import ContentBlocks from '@/components/blocks/ContentBlocks';

export const metadata = {
  title: 'Wedding Suppliers | Victoria Photography',
  description: 'Discover trusted wedding suppliers who have worked with us to create beautiful celebrations. Each supplier has been carefully selected for their quality, reliability, and commitment to making your day perfect.',
};

export default function SuppliersPage() {
  return (
    <main>
      <ContentBlocks pageSlug="recommended-wedding-suppliers" />
    </main>
  );
}
