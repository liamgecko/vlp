import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, WPPost, HeroBlock } from '@/lib/wp';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PostContent from '@/components/blocks/PostContent';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, ''), // Strip HTML tags
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Create hero data from post
  const heroData: HeroBlock = {
    heroHeading: post.title,
    heroImage: post.featuredImage,
    heroSubHeading: `By ${post.author.node.name} • ${new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`,
  };

  return (
    <main className="min-h-screen">
      {/* Hero Block with Featured Image and Title */}
      <Hero heroData={heroData} />

      {/* Post Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Post Content */}
            <PostContent 
              content={post.content}
              className="prose max-w-none prose-headings:text-primary prose-headings:font-heading prose-p:text-[#554d77] prose-a:text-blush-300 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
