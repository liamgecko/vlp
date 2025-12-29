import { GraphQLClient } from 'graphql-request';
import { getEnv } from './env';
import { WPError, NotFoundError, NetworkError, safeAsync } from './errors';

// Create GraphQL client with proper configuration
function createWPClient() {
  const env = getEnv();
  return new GraphQLClient(env.WP_GRAPHQL_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      ...(env.WP_ACCESS_TOKEN && {
        'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`,
      }),
    },
  });
}

// Lazy initialization of GraphQL client
let _wp: GraphQLClient | null = null;
export const wp = new Proxy({} as GraphQLClient, {
  get(target, prop) {
    if (!_wp) {
      _wp = createWPClient();
    }
    return (_wp as unknown as Record<string, unknown>)[prop as string];
  }
});

// WordPress Menu Types
export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId?: string;
  children?: WPMenuItem[];
}

export interface WPMenu {
  name: string;
  menuItems: {
    nodes: WPMenuItem[];
  };
}

// GraphQL Query for Main Menu
export const GET_MAIN_MENU = /* GraphQL */ `
  query GetMainMenu {
    menu(id: "main-menu", idType: SLUG) {
      name
      menuItems {
        nodes {
          id
          label
          url
          path
          parentId
        }
      }
    }
  }
`;

// WordPress Page Types
export interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  acfFields?: Record<string, unknown>;
}

// Call to Action Types
export interface CallToActionLink {
  url: string;
  title: string;
}

export interface CallToActionButton {
  callToActionButtonText: string;
  callToActionLink: CallToActionLink;
}

export interface CallToActionFields {
  callToActionHeading: string;
  callToActionText: string;
  callToActionButton: CallToActionButton;
}

// Footer Types
export interface ContactDetailsFields {
  phoneNumber?: string;
  emailAddress?: string;
  address?: string;
  facebookUrl?: string;
  xUrl?: string;
  instagramUrl?: string;
  pinterestUrl?: string;
}

// Hero Block Types
export interface HeroBlock {
  heroHeading?: string;
  heroImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  heroSubHeading?: string;
  primaryButton?: {
    primaryButtonLink: {
      url: string;
      title: string;
    };
  };
  secondaryButton?: {
    secondaryButtonLink: {
      url: string;
      title: string;
    };
  };
}

export interface ImageTextBlock {
  heading?: string;
  content?: string;
  image?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  video?: string;
  imagePosition?: string;
  buttonLink?: {
    url: string;
    title: string;
  };
  blockColour?: string | string[];
}

export interface ScrollSection {
  image?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  heading?: string;
  content?: string;
  buttonLink?: {
    url: string;
    title: string;
  };
}

export interface ScrollSectionsBlock {
  heading?: string;
  introContent?: string;
  sections?: ScrollSection[];
}

export interface TestimonialBlock {
  quote?: string;
  reviewerName?: string;
  backgroundImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface CarouselBlock {
  heading?: string;
  introContent?: string;
  carouselImages?: Array<{
    sourceUrl: string;
    altText: string;
  }> | {
    nodes: Array<{
      sourceUrl: string;
      altText: string;
    }>;
  };
  blockColour?: string | string[];
}

export interface ImageTextCarouselItem {
  itemHeading?: string;
  itemContent?: string;
  itemImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  itemColour?: string | string[];
}

export interface ImageTextCarouselBlock {
  introHeading?: string;
  introContent?: string;
  carouselItems?: Array<{
    item?: ImageTextCarouselItem;
  }>;
  blockColour?: string | string[];
}

export interface PricingCard {
  packageTitle?: string;
  packageCost?: string;
  packageDescription?: string;
  buttonLink?: {
    url: string;
    title: string;
    target?: string;
  };
  featured?: boolean;
}

export interface PricingTableBlock {
  introHeading?: string;
  introContent?: string;
  pricingCards?: Array<{
    card?: PricingCard;
  }>;
  blockColour?: string | string[];
  customPricing?: {
    customPricingHeading?: string;
    customPricingContent?: string;
    customPricingButton?: {
      url: string;
      title: string;
      target?: string;
    };
  };
}

export interface GalleryBlock {
  introHeading?: string;
  introContent?: string;
  galleryImages?: Array<{
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  }> | {
    nodes: Array<{
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    }>;
  };
  blockColour?: string | string[];
}

export interface TextBlock {
  content?: string;
  blockColour?: string | string[];
}

export interface VideoBlock {
  introHeading?: string;
  introContent?: string;
  videoUrl?: string;
  blockColour?: string | string[];
}

export interface SuppliersGridBlock {
  introHeading?: string;
  introContent?: string;
  blockColour?: string | string[];
  supplier?: Array<{
    supplierName?: string;
    supplierCategory?: string;
    supplierWebsite?: string;
    supplierDescription?: string;
    supplierImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  }>;
}

export interface ContactPageFields {
  formLink?: string;
  hero?: {
    heroImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    heroHeading?: string;
    heroSubHeading?: string;
    primaryButton?: {
      url: string;
      title: string;
    };
  };
  content?: string;
  contactDetails?: {
    phoneNumber?: string;
    emailAddress?: string;
    address?: string;
  };
}

export interface BlogPageFields {
  blogHeading?: string;
  blogIntroContent?: string;
}

export interface ContentBlocksContainer {
  contentBlocks: Array<{
    __typename: string;
    // Hero Block fields
    heroHeading?: string;
    heroImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    heroSubHeading?: string;
    primaryButton?: {
      primaryButtonLink: {
        url: string;
        title: string;
      };
    };
    secondaryButton?: {
      secondaryButtonLink: {
        url: string;
        title: string;
      };
    };
    // Image Text Block fields
    heading?: string;
    content?: string;
    image?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    video?: string;
    imagePosition?: string;
    buttonLink?: {
      url: string;
      title: string;
    };
    blockColour?: string | string[];
    // Scroll Sections Block fields
    introContent?: string;
    sections?: Array<{
      scrollSection?: {
        image?: {
          node: {
            sourceUrl: string;
            altText: string;
          };
        };
        heading?: string;
        content?: string;
        buttonLink?: {
          url: string;
          title: string;
        };
      };
    }>;
    // Testimonial Block fields
    quote?: string;
    reviewerName?: string;
    backgroundImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    // Carousel Block fields
    carouselImages?: Array<{
      sourceUrl: string;
      altText: string;
    }> | {
      nodes: Array<{
        sourceUrl: string;
        altText: string;
      }>;
    };
    // ImageTextCarousel Block fields
    introHeading?: string; // Shared heading field
    carouselItems?: Array<{
      item?: {
        itemHeading?: string;
        itemContent?: string;
        itemImage?: {
          node: {
            sourceUrl: string;
            altText: string;
          };
        };
      };
    }>;
    // Pricing Table Block fields
    pricingCards?: Array<{
      card?: {
        packageTitle?: string;
        packageCost?: string;
        packageDescription?: string;
        buttonLink?: {
          url: string;
          title: string;
          target?: string;
        };
        featured?: boolean;
      };
    }>;
    customPricing?: {
      customPricingHeading?: string;
      customPricingContent?: string;
      customPricingButton?: {
        url: string;
        title: string;
        target?: string;
      };
    };
    // Gallery Block fields
    galleryImages?: Array<{
      node: {
        sourceUrl: string;
        altText: string;
        mediaDetails: {
          width: number;
          height: number;
        };
      };
    }> | {
      nodes: Array<{
        sourceUrl: string;
        altText: string;
        mediaDetails: {
          width: number;
          height: number;
        };
      }>;
    };
    // Text Block fields (content field already exists above)
    // Video Block fields
    videoUrl?: string;
  }>;
}

// GraphQL Query for Page by Slug
export const GET_PAGE_BY_SLUG = /* GraphQL */ `
  query GetPageBySlug($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      slug
      content
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// GraphQL Query for All Pages
export const GET_ALL_PAGES = /* GraphQL */ `
  query GetAllPages {
    pages {
      nodes {
        id
        title
        slug
        date
        modified
      }
    }
  }
`;

// GraphQL Query for Call to Action Fields from Options
export const GET_CALL_TO_ACTION_FIELDS = /* GraphQL */ `
  query GetCallToActionFields {
    callToAction {
      callToActionFields {
        callToActionHeading
        callToActionText
        callToActionButton {
          callToActionButtonText
          callToActionLink {
            url
            title
          }
        }
      }
    }
  }
`;

// GraphQL Query for Footer Menu
export const GET_FOOTER_MENU = /* GraphQL */ `
  query GetFooterMenu {
    menu(id: "footer-menu", idType: SLUG) {
      name
      menuItems {
        nodes {
          id
          label
          url
          path
          parentId
        }
      }
    }
  }
`;

// GraphQL Query for Contact Details from Options
export const GET_CONTACT_DETAILS = /* GraphQL */ `
  query GetContactDetails {
    contactDetails {
      contactDetailsFields {
        phoneNumber
        emailAddress
        address
        facebookUrl
        xUrl
        instagramUrl
        pinterestUrl
      }
    }
  }
`;

// GraphQL Query for Content Blocks
export const GET_CONTENT_BLOCKS = /* GraphQL */ `
  query GetContentBlocks($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      contentBlocksContainer {
        contentBlocks {
          __typename
          ... on ContentBlocksContainerContentBlocksHeroBlockLayout {
            heroHeading
            heroImage {
              node {
                sourceUrl
                altText
              }
            }
            heroSubHeading
            primaryButton {
              primaryButtonLink {
                url
                title
              }
            }
            secondaryButton {
              secondaryButtonLink {
                url
                title
              }
            }
          }
          ... on ContentBlocksContainerContentBlocksImageWithTextLayout {
            heading
            content
            image {
              node {
                sourceUrl
                altText
              }
            }
            video
            imagePosition
            buttonLink {
              url
              title
            }
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksScrollSectionLayout {
            heading
            introContent
            sections {
              scrollSection {
                image {
                  node {
                    sourceUrl
                    altText
                  }
                }
                heading
                content
                buttonLink {
                  url
                  title
                }
              }
            }
          }
          ... on ContentBlocksContainerContentBlocksTestimonialLayout {
            quote
            reviewerName
            backgroundImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on ContentBlocksContainerContentBlocksCarouselLayout {
            heading
            introContent
            carouselImages {
              nodes {
                sourceUrl
                altText
              }
            }
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksTextCarouselLayout {
            introHeading
            introContent
            carouselItems {
              item {
                itemHeading
                itemContent
                itemImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                itemColour
              }
            }
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksPricingTableLayout {
            introHeading
            introContent
            pricingCards {
              card {
                packageTitle
                packageCost
                packageDescription
                buttonLink {
                  url
                  title
                  target
                }
                featured
              }
            }
            customPricing {
              customPricingHeading
              customPricingContent
              customPricingButton {
                url
                title
                target
              }
            }
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksGalleryLayout {
            introHeading
            introContent
            galleryImages(first: 500) {
              nodes {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksTextBlockLayout {
            content
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksVideoLayout {
            introHeading
            introContent
            videoUrl
            blockColour
          }
          ... on ContentBlocksContainerContentBlocksSuppliersGridLayout {
            introHeading
            introContent
            blockColour
            supplier {
              supplierName
              supplierCategory
              supplierWebsite
              supplierDescription
              supplierImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL Query for Contact Page Fields
export const GET_CONTACT_PAGE_FIELDS = /* GraphQL */ `
  query GetContactPageFields($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      title
      content
      contactPageForm {
        formLink
        hero {
          heroImage {
            node {
              sourceUrl
              altText
            }
          }
          heroHeading
          heroSubHeading
          primaryButton {
            url
            title
          }
        }
        content
      }
    }
  }
`;

// Service function to fetch contact page fields
export async function getContactPageFields(): Promise<ContactPageFields | null> {
  try {
    const data = await wp.request<{ 
      page: { contactPageForm: ContactPageFields }
    }>(GET_CONTACT_PAGE_FIELDS, {
      id: 37 // Contact page ID - pass directly, not nested in variables
    });
    
    const contactPageForm = data.page.contactPageForm;
    
    // Fetch contact details separately
    const contactDetails = await getContactDetails();
    
    return {
      ...contactPageForm,
      contactDetails: contactDetails ? {
        phoneNumber: contactDetails.phoneNumber,
        emailAddress: contactDetails.emailAddress,
        address: contactDetails.address,
      } : undefined
    };
  } catch (error) {
    console.error('Error fetching contact page fields:', error);
    return null;
  }
}

// GraphQL Query for Blog Page Fields by ID
export const GET_BLOG_PAGE_FIELDS_BY_ID = /* GraphQL */ `
  query GetBlogPageFieldsById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      title
      blog {
        blogHeading
        blogIntroContent
      }
    }
  }
`;

// GraphQL Query for Blog Page Fields by slug
export const GET_BLOG_PAGE_FIELDS_BY_SLUG = /* GraphQL */ `
  query GetBlogPageFieldsBySlug($slug: String!) {
    pageBy(uri: $slug) {
      id
      title
      blog {
        blogHeading
        blogIntroContent
      }
    }
  }
`;

// Service function to fetch blog page fields
export async function getBlogPageFields(): Promise<BlogPageFields | null> {
  try {
    // First try by slug (more reliable)
    const data = await wp.request<{ pageBy: { blog: BlogPageFields } }>(GET_BLOG_PAGE_FIELDS_BY_SLUG, {
      slug: "blog"
    });
    
    if (data.pageBy?.blog) {
      return data.pageBy.blog;
    }
    
    // Fallback to ID if slug doesn't work
    const dataById = await wp.request<{ page: { blog: BlogPageFields } }>(GET_BLOG_PAGE_FIELDS_BY_ID, {
      id: 2 // Blog page ID - adjust if different
    });
    
    if (dataById.page?.blog) {
      return dataById.page.blog;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog page fields:', error);
    return null;
  }
}

// Service function to fetch main menu
export async function getMainMenu(): Promise<WPMenuItem[]> {
  try {
    const data = await wp.request<{ menu: WPMenu }>(GET_MAIN_MENU);
    
    if (!data.menu?.menuItems?.nodes) {
      console.warn('No menu found or menu items are empty');
      return [];
    }

    // Transform flat menu items into hierarchical structure
    const menuItems = data.menu.menuItems.nodes;
    const menuMap = new Map<string, WPMenuItem>();
    const rootItems: WPMenuItem[] = [];

    // First pass: create all menu items
    menuItems.forEach(item => {
      menuMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build hierarchy
    menuItems.forEach(item => {
      const menuItem = menuMap.get(item.id)!;
      if (item.parentId && menuMap.has(item.parentId)) {
        const parent = menuMap.get(item.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(menuItem);
      } else {
        rootItems.push(menuItem);
      }
    });

    return rootItems;
  } catch (error) {
    console.error('Error fetching main menu:', error);
    return [];
  }
}

// Service function to fetch page by slug
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const result = await safeAsync(async () => {
    if (!slug || typeof slug !== 'string') {
      throw new WPError('Invalid slug provided', 'INVALID_SLUG', 400);
    }

    try {
      const uri = `/${slug}/`;
      const data = await wp.request<{ pageBy: WPPage }>(GET_PAGE_BY_SLUG, { uri });
      
      if (!data.pageBy) {
        throw new NotFoundError('Page', slug);
      }
      
      return data.pageBy;
    } catch (error) {
      if (error instanceof WPError) {
        throw error;
      }
      
      // Handle GraphQL errors
      if (error instanceof Error && error.message.includes('404')) {
        throw new NotFoundError('Page', slug);
      }
      
      throw new NetworkError(`Failed to fetch page: ${error instanceof Error ? error.message : 'Unknown error'}`, error as Error);
    }
  }, null, { slug, function: 'getPageBySlug' });
  
  return result ?? null;
}

// Service function to get all pages (for generating static paths)
export async function getAllPages(): Promise<WPPage[]> {
  try {
    const data = await wp.request<{ pages: { nodes: WPPage[] } }>(GET_ALL_PAGES);
    return data.pages.nodes;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
}

// Service function to fetch Call to Action fields
export async function getCallToActionFields(): Promise<CallToActionFields | null> {
  try {
    const data = await wp.request<{ callToAction: { callToActionFields: CallToActionFields } }>(GET_CALL_TO_ACTION_FIELDS);
    return data.callToAction.callToActionFields;
  } catch (error) {
    console.error('Error fetching Call to Action fields:', error);
    return null;
  }
}

// Service function to fetch footer menu
export async function getFooterMenu(): Promise<WPMenuItem[]> {
  try {
    const data = await wp.request<{ menu: WPMenu }>(GET_FOOTER_MENU);
    
    if (!data.menu?.menuItems?.nodes) {
      console.warn('No footer menu found or menu items are empty');
      return [];
    }

    // Transform flat menu items into hierarchical structure
    const menuItems = data.menu.menuItems.nodes;
    const menuMap = new Map<string, WPMenuItem>();
    const rootItems: WPMenuItem[] = [];

    // First pass: create all menu items
    menuItems.forEach(item => {
      menuMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build hierarchy
    menuItems.forEach(item => {
      const menuItem = menuMap.get(item.id)!;
      if (item.parentId && menuMap.has(item.parentId)) {
        const parent = menuMap.get(item.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(menuItem);
      } else {
        rootItems.push(menuItem);
      }
    });

    return rootItems;
  } catch (error) {
    console.error('Error fetching footer menu:', error);
    return [];
  }
}

// Service function to fetch contact details
export async function getContactDetails(): Promise<ContactDetailsFields | null> {
  try {
    const data = await wp.request<{ contactDetails: { contactDetailsFields: ContactDetailsFields } }>(GET_CONTACT_DETAILS);
    return data.contactDetails.contactDetailsFields;
  } catch (error) {
    console.error('Error fetching contact details:', error);
    // Return fallback data instead of null to prevent hydration issues
    return {
      address: '',
      facebookUrl: '',
      xUrl: '',
      instagramUrl: '',
      pinterestUrl: ''
    };
  }
}

// WordPress Post Types
export interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

// GraphQL Query for Posts with Pagination
export const GET_POSTS = /* GraphQL */ `
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

// Service function to fetch posts with pagination
export async function getPosts(first: number = 10, after?: string): Promise<{ posts: WPPost[]; pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string; endCursor: string } }> {
  try {
    const data = await wp.request<{ posts: { nodes: WPPost[]; pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string; endCursor: string } } }>(GET_POSTS, { first, after });
    return {
      posts: data.posts.nodes,
      pageInfo: data.posts.pageInfo
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: '', endCursor: '' }
    };
  }
}

// Get total count of posts for pagination
export async function getPostsCount(): Promise<number> {
  try {
    // Get a large number of posts to count them
    const data = await wp.request<{ posts: { nodes: WPPost[] } }>(`
      query GetPostsCount {
        posts(first: 1000) {
          nodes {
            id
          }
        }
      }
    `);
    return data.posts.nodes.length;
  } catch (error) {
    console.error('Error fetching posts count:', error);
    return 0;
  }
}

// GraphQL Query for Single Post
export const GET_POST_BY_SLUG = /* GraphQL */ `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// GraphQL Query for All Posts (for static generation)
export const GET_ALL_POSTS = /* GraphQL */ `
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        slug
      }
    }
  }
`;

// Service function to fetch single post by slug
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const data = await wp.request<{ postBy: WPPost }>(GET_POST_BY_SLUG, { slug });
    return data.postBy;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Service function to fetch all posts (for static generation)
export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const data = await wp.request<{ posts: { nodes: WPPost[] } }>(GET_ALL_POSTS);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// Get WordPress Reading Settings
// Note: postsPerPage is not available in GraphQL GeneralSettings
// Using the value from WordPress Reading Settings (10 posts)
export async function getReadingSettings(): Promise<{ postsPerPage: number }> {
  // WordPress Reading Settings shows 10 posts per page
  // This should match your WordPress "Blog pages show at most" setting
  return { postsPerPage: 10 };
}

// Service function to fetch content blocks
export async function getContentBlocks(slug: string): Promise<ContentBlocksContainer['contentBlocks']> {
  try {
    const uri = `/${slug}/`;
    const data = await wp.request<{ pageBy: { contentBlocksContainer: ContentBlocksContainer } }>(GET_CONTENT_BLOCKS, { uri });
    
    if (data.pageBy?.contentBlocksContainer?.contentBlocks) {
      return data.pageBy.contentBlocksContainer.contentBlocks;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching content blocks:', error);
    return [];
  }
}

// Service function to fetch page SEO data
export async function getPageSEO(slug: string) {
  try {
    const uri = `/${slug}/`;
    const data = await wp.request<{ pageBy: { seo?: { title?: string; metaDesc?: string; canonical?: string; opengraphTitle?: string; opengraphDescription?: string; opengraphImage?: { sourceUrl: string; altText?: string }; twitterTitle?: string; twitterDescription?: string; twitterImage?: { sourceUrl: string; altText?: string }; schema?: { raw: string } } } }>(`
      query GetPageSEO($uri: String!) {
        pageBy(uri: $uri) {
          seo {
            title
            metaDesc
            canonical
            opengraphTitle
            opengraphDescription
            opengraphImage {
              sourceUrl
              altText
            }
            twitterTitle
            twitterDescription
            twitterImage {
              sourceUrl
              altText
            }
            schema {
              raw
            }
          }
        }
      }
    `, { uri });
    
    return data.pageBy?.seo;
  } catch (error) {
    console.error('Error fetching page SEO:', error);
    return null;
  }
}