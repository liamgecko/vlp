// Environment variable validation and configuration
interface EnvConfig {
  WP_GRAPHQL_ENDPOINT: string;
  WP_ACCESS_TOKEN?: string;
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL: string;
}

// Validate required environment variables
function validateEnv(): EnvConfig {
  const required = ['WP_GRAPHQL_ENDPOINT', 'NEXT_PUBLIC_SITE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }

  // Validate URL format
  const wpEndpoint = process.env.WP_GRAPHQL_ENDPOINT!;
  if (!wpEndpoint.startsWith('http://') && !wpEndpoint.startsWith('https://')) {
    throw new Error('WP_GRAPHQL_ENDPOINT must be a valid URL starting with http:// or https://');
  }

  // Warn about HTTP in production
  if (process.env.NODE_ENV === 'production' && wpEndpoint.startsWith('http://')) {
    console.warn('⚠️  WARNING: Using HTTP endpoint in production. Consider using HTTPS for security.');
  }

  return {
    WP_GRAPHQL_ENDPOINT: wpEndpoint,
    WP_ACCESS_TOKEN: process.env.WP_ACCESS_TOKEN,
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
  };
}

// Export validated environment configuration
export const env = validateEnv();

// Helper function to get full URL
export const getFullUrl = (path: string = '') => {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.endsWith('/') 
    ? env.NEXT_PUBLIC_SITE_URL.slice(0, -1) 
    : env.NEXT_PUBLIC_SITE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Helper function to check if we're in production
export const isProduction = () => env.NODE_ENV === 'production';

// Helper function to check if we're in development
export const isDevelopment = () => env.NODE_ENV === 'development';
