# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# WordPress Configuration
WP_GRAPHQL_ENDPOINT=http://victoria-photography.local/graphql
WP_ACCESS_TOKEN=your_wordpress_access_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## Environment Variable Descriptions

### `WP_GRAPHQL_ENDPOINT`
- **Required**: Yes
- **Description**: The GraphQL endpoint URL for your WordPress site
- **Example**: `http://victoria-photography.local/graphql`
- **Production**: Should use HTTPS URL

### `WP_ACCESS_TOKEN`
- **Required**: No (but recommended for production)
- **Description**: WordPress access token for authenticated requests
- **Example**: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`

### `NEXT_PUBLIC_SITE_URL`
- **Required**: Yes
- **Description**: The public URL of your Next.js application
- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com`

### `NODE_ENV`
- **Required**: No (defaults to 'development')
- **Description**: Environment mode
- **Values**: `development`, `production`, `test`

## Security Notes

1. **Never commit `.env.local`** to version control
2. **Use HTTPS in production** for all URLs
3. **Rotate access tokens** regularly
4. **Use strong, unique tokens** for production

## Production Checklist

- [ ] All URLs use HTTPS
- [ ] Access tokens are properly configured
- [ ] Site URL matches your domain
- [ ] Environment variables are set in your hosting platform
- [ ] No sensitive data in client-side code

## Troubleshooting

### Common Issues

1. **"Missing required environment variables"**
   - Check that `.env.local` exists in the root directory
   - Verify all required variables are set
   - Restart your development server

2. **"Invalid URL format"**
   - Ensure URLs start with `http://` or `https://`
   - Check for typos in the endpoint URL

3. **"Network errors"**
   - Verify WordPress site is running
   - Check GraphQL endpoint is accessible
   - Ensure CORS is configured properly
