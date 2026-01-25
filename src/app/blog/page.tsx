import { notFound } from 'next/navigation';
import { getPageBySlug, getPosts, getPageSEO, getReadingSettings, getBlogPageFields, wp } from '@/lib/wp';
import { GET_BLOG_PAGE_FIELDS_BY_SLUG } from '@/lib/wp';
import HeroBlock from '@/components/blocks/Hero';
import CardGrid from '@/components/CardGrid';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate metadata for the blog page
export async function generateMetadata(): Promise<Metadata> {
  let page = await getPageBySlug('wedding-photography-blog');
  if (!page) {
    page = await getPageBySlug('blog');
  }
  
  if (!page) {
    return {
      title: 'Blog - Victoria Photography',
      description: 'Read our latest blog posts about wedding photography',
    };
  }

  try {
    const seo = await getPageSEO('wedding-photography-blog') || await getPageSEO('blog');
    
    return {
      title: seo?.title || 'Blog - Victoria Photography',
      description: seo?.metaDesc || 'Read our latest blog posts about wedding photography, real wedding stories, and photography tips',
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || 'Blog - Victoria Photography',
        description: seo?.opengraphDescription || seo?.metaDesc || 'Read our latest blog posts about wedding photography, real wedding stories, and photography tips',
        images: seo?.opengraphImage?.sourceUrl ? [seo.opengraphImage.sourceUrl] : ['/vlp-01.jpg'],
        siteName: 'Victoria Photography',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.twitterTitle || seo?.opengraphTitle || seo?.title || 'Blog - Victoria Photography',
        description: seo?.twitterDescription || seo?.opengraphDescription || seo?.metaDesc || 'Read our latest blog posts about wedding photography, real wedding stories, and photography tips',
        images: seo?.twitterImage?.sourceUrl || seo?.opengraphImage?.sourceUrl || '/vlp-01.jpg',
      },
      alternates: {
        canonical: seo?.canonical || 'http://victoria-photography.local/blog/',
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog - Victoria Photography',
      description: 'Read our latest blog posts about wedding photography, real wedding stories, and photography tips',
    };
  }
}

export default async function Blog({ searchParams }: BlogPageProps) {
  // Try both 'wedding-photography-blog' and 'blog' slugs (prioritize new slug)
  let page = await getPageBySlug('wedding-photography-blog');
  if (!page) {
    page = await getPageBySlug('blog');
  }
  
  if (!page) {
    notFound();
  }

  try {
    // Try both slugs for blog fields
    let blogFields = await getBlogPageFields();
    if (!blogFields) {
      // Try alternative slug - use the same query structure
      try {
        const altData = await wp.request<{ pageBy: { blog: { blogHeading?: string; blogIntroContent?: string } | null } }>(GET_BLOG_PAGE_FIELDS_BY_SLUG, {
          slug: "wedding-photography-blog"
        });
        blogFields = altData.pageBy?.blog || null;
      } catch (error) {
        console.error('Error fetching blog fields with alternative slug:', error);
      }
    }
    
    const readingSettings = await getReadingSettings();
    const resolvedSearchParams = await searchParams;
    const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
    const postsPerPage = readingSettings?.postsPerPage || 10;
    
    // Get all posts first
    const { posts } = await getPosts(100); // Get more posts than needed
    
    // Calculate pagination
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    
    // Calculate which posts to show for current page
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Transform WordPress posts to CardGrid format
    const cardGridPosts = paginatedPosts.map((post) => ({
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
      {/* Hero Block from WordPress */}
      <HeroBlock pageSlug="wedding-photography-blog" />

      {/* Blog Posts using CardGrid */}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-sunflower-100 pb-16">
          <div className="container mx-auto px-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/wedding-photography-blog"
            />
          </div>
        </div>
      )}
    </main>
  );
  } catch (error) {
    console.error('Error in Blog page:', error);
    // Return page with hero and fallback content
    return (
      <main className="min-h-screen">
        <HeroBlock pageSlug="wedding-photography-blog" />
        <section id="articles">
          <CardGrid
            heading="Real wedding stories"
            description="Discover the latest blog posts from Vicki"
            showHeading={true}
            showButton={false}
            className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
          />
        </section>
      </main>
    );
  }
}
