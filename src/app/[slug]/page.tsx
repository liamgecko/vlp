import { notFound } from 'next/navigation';
import { getCachedPageBySlug, getCachedAllPages, getCachedPageSEO } from '@/lib/cache';
import { getContactPageFields } from '@/lib/wp';
import ContentBlocks from '@/components/blocks/ContentBlocks';
import ContactPage from '@/components/ContactPage';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all pages
export async function generateStaticParams() {
  const pages = await getCachedAllPages();
  
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCachedPageBySlug(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  try {
    const seo = await getCachedPageSEO(slug);
    
    return {
      title: seo?.title || `${page.title} - Victoria Photography`,
      description: seo?.metaDesc || `${page.title} - Professional wedding photography in Fife and Scotland`,
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || `${page.title} - Victoria Photography`,
        description: seo?.opengraphDescription || seo?.metaDesc || `${page.title} - Professional wedding photography in Fife and Scotland`,
        images: seo?.opengraphImage?.sourceUrl ? [seo.opengraphImage.sourceUrl] : ['/vlp-01.jpg'],
        siteName: 'Victoria Photography',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.twitterTitle || seo?.opengraphTitle || seo?.title || `${page.title} - Victoria Photography`,
        description: seo?.twitterDescription || seo?.opengraphDescription || seo?.metaDesc || `${page.title} - Professional wedding photography in Fife and Scotland`,
        images: seo?.twitterImage?.sourceUrl || seo?.opengraphImage?.sourceUrl || '/vlp-01.jpg',
      },
      alternates: {
        canonical: seo?.canonical || `http://victoria-photography.local/${slug}/`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `${page.title} - Victoria Photography`,
      description: `${page.title} - Professional wedding photography in Fife and Scotland`,
    };
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getCachedPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Check if this is the contact page (ID: 37)
  if (page.id === 'cG9zdDozNw==') { // Base64 encoded "post:37"
    const contactFields = await getContactPageFields();
    
    return (
      <main className="min-h-screen">
        <ContactPage
          formLink={contactFields?.formLink}
          hero={contactFields?.hero}
          content={contactFields?.content}
          contactDetails={contactFields?.contactDetails}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <ContentBlocks pageSlug={slug} />
    </main>
  );
}
