import { getPageBySlug, getPageSEO } from '@/lib/wp';
import ContentBlocks from '@/components/blocks/ContentBlocks';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getPageSEO('home');
    
    return {
      title: seo?.title || 'Victoria Photography - Wedding Photography in Fife & Scotland',
      description: seo?.metaDesc || 'Professional wedding photography in Fife and throughout Scotland. Capturing your special day with over 13 years of experience.',
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || 'Victoria Photography - Wedding Photography in Fife & Scotland',
        description: seo?.opengraphDescription || seo?.metaDesc || 'Professional wedding photography in Fife and throughout Scotland. Capturing your special day with over 13 years of experience.',
        images: seo?.opengraphImage?.sourceUrl ? [seo.opengraphImage.sourceUrl] : ['/vlp-01.jpg'],
        siteName: 'Victoria Photography',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.twitterTitle || seo?.opengraphTitle || seo?.title || 'Victoria Photography - Wedding Photography in Fife & Scotland',
        description: seo?.twitterDescription || seo?.opengraphDescription || seo?.metaDesc || 'Professional wedding photography in Fife and throughout Scotland. Capturing your special day with over 13 years of experience.',
        images: seo?.twitterImage?.sourceUrl || seo?.opengraphImage?.sourceUrl || '/vlp-01.jpg',
      },
      alternates: {
        canonical: seo?.canonical || 'http://victoria-photography.local/',
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Victoria Photography - Wedding Photography in Fife & Scotland',
      description: 'Professional wedding photography in Fife and throughout Scotland. Capturing your special day with over 13 years of experience.',
    };
  }
}

export default async function Home() {
  // Fetch the home page content from WordPress
  const page = await getPageBySlug('home');

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF4EB] to-sunflower-100">
        <div className="text-center px-4">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Welcome to Victoria Photography
          </h1>
          <p className="text-lg text-[#554d77]">
            Content coming soon...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Dynamic Content Blocks from WordPress */}
      <ContentBlocks pageSlug="home" />
    </main>
  );
}
