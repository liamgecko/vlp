import { notFound } from 'next/navigation';
import { getPageBySlug, getAllPages, getPageSEO } from '@/lib/wp';
import { getContactPageFields, getReadingSettings, getBlogPageFields, getPosts } from '@/lib/wp';
import ContentBlocks from '@/components/blocks/ContentBlocks';
import ContactPage from '@/components/ContactPage';
import HeroBlock from '@/components/blocks/Hero';
import CardGrid from '@/components/CardGrid';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all pages
export async function generateStaticParams() {
  const pages = await getAllPages();
  
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  try {
    const seo = await getPageSEO(slug);
    
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
  const page = await getPageBySlug(slug);

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

  // Check if this is the blog page (by slug)
  if (slug === 'blog' || slug === 'wedding-photography-blog') {
    try {
      const blogFields = await getBlogPageFields();
      const readingSettings = await getReadingSettings();
      const postsPerPage = readingSettings?.postsPerPage || 10;
      
      // Get all posts
      const { posts } = await getPosts(100);
      
      // Calculate pagination
      const totalPosts = posts.length;
      const totalPages = Math.ceil(totalPosts / postsPerPage);
      const currentPage = 1; // Default to page 1 for now
      
      // Transform WordPress posts to CardGrid format
      const cardGridPosts = posts.slice(0, postsPerPage).map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt.replace(/(<([^>]+)>)/gi, ""), // Remove HTML tags from excerpt
        imageSrc: post.featuredImage?.node?.sourceUrl || "https://placekitten.com/400/300",
        imageAlt: post.featuredImage?.node?.altText || post.title,
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        }),
        category: post.categories.nodes.length > 0 ? post.categories.nodes[0].name : "Blog Post",
        slug: post.slug
      }));

      return (
        <main className="min-h-screen">
          <HeroBlock pageSlug={slug} />
          <section id="articles">
            <CardGrid
              posts={cardGridPosts.length > 0 ? cardGridPosts : undefined}
              heading={blogFields?.blogHeading || "Real wedding stories"}
              description={blogFields?.blogIntroContent || "Discover the latest blog posts from Vicki"}
              showHeading={true}
              showButton={false}
              className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
            />
          </section>
          {totalPages > 1 && (
            <div className="bg-sunflower-100 pb-16">
              <div className="container mx-auto px-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath={`/${slug}`}
                />
              </div>
            </div>
          )}
        </main>
      );
    } catch (error) {
      console.error('Error loading blog page in [slug] route:', error);
      // Fallback to content blocks if blog loading fails
    }
  }

  return (
    <main className="min-h-screen">
      <ContentBlocks pageSlug={slug} />
    </main>
  );
}
