import { unstable_cache } from 'next/cache';

// Cache configuration
const CACHE_TAGS = {
  PAGES: 'pages',
  POSTS: 'posts',
  MENUS: 'menus',
  CONTACT: 'contact',
  SEO: 'seo',
} as const;

const CACHE_DURATION = {
  PAGES: 3600, // 1 hour
  POSTS: 1800, // 30 minutes
  MENUS: 7200, // 2 hours
  CONTACT: 3600, // 1 hour
  SEO: 1800, // 30 minutes
} as const;

// Generic cache wrapper
function createCachedFunction<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  key: string,
  tags: string[],
  revalidate: number
) {
  return unstable_cache(fn, [key], {
    revalidate,
    tags,
  });
}

// Cached WordPress functions
export const getCachedPageBySlug = createCachedFunction(
  async (slug: string) => {
    const { getPageBySlug } = await import('./wp');
    return getPageBySlug(slug);
  },
  'page-by-slug',
  [CACHE_TAGS.PAGES],
  CACHE_DURATION.PAGES
);

export const getCachedAllPages = createCachedFunction(
  async () => {
    const { getAllPages } = await import('./wp');
    return getAllPages();
  },
  'all-pages',
  [CACHE_TAGS.PAGES],
  CACHE_DURATION.PAGES
);

export const getCachedMainMenu = createCachedFunction(
  async () => {
    const { getMainMenu } = await import('./wp');
    return getMainMenu();
  },
  'main-menu',
  [CACHE_TAGS.MENUS],
  CACHE_DURATION.MENUS
);

export const getCachedFooterMenu = createCachedFunction(
  async () => {
    const { getFooterMenu } = await import('./wp');
    return getFooterMenu();
  },
  'footer-menu',
  [CACHE_TAGS.MENUS],
  CACHE_DURATION.MENUS
);

export const getCachedContactDetails = createCachedFunction(
  async () => {
    const { getContactDetails } = await import('./wp');
    return getContactDetails();
  },
  'contact-details',
  [CACHE_TAGS.CONTACT],
  CACHE_DURATION.CONTACT
);

export const getCachedPageSEO = createCachedFunction(
  async (slug: string) => {
    const { getPageSEO } = await import('./wp');
    return getPageSEO(slug);
  },
  'page-seo',
  [CACHE_TAGS.SEO],
  CACHE_DURATION.SEO
);

export const getCachedPosts = createCachedFunction(
  async (first: number, after?: string) => {
    const { getPosts } = await import('./wp');
    return getPosts(first, after);
  },
  'posts',
  [CACHE_TAGS.POSTS],
  CACHE_DURATION.POSTS
);

export const getCachedContentBlocks = createCachedFunction(
  async (pageSlug: string) => {
    const { getContentBlocks } = await import('./wp');
    return getContentBlocks(pageSlug);
  },
  'content-blocks',
  [CACHE_TAGS.PAGES],
  CACHE_DURATION.PAGES
);

// Cache invalidation helpers
export const revalidatePages = () => {
  // This would be called when pages are updated in WordPress
  // In a real implementation, you'd use webhooks or similar
  console.log('Pages cache should be invalidated');
};

export const revalidateMenus = () => {
  console.log('Menus cache should be invalidated');
};

export const revalidatePosts = () => {
  console.log('Posts cache should be invalidated');
};
