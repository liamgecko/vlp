import { wp, getMainMenu } from '@/lib/wp';

export const revalidate = 0; // no cache while testing

const Q = /* GraphQL */ `
  query Posts($first:Int=1){
    posts(first:$first, where:{orderby:{field:DATE, order:DESC}}){
      nodes{ id title slug date }
    }
  }
`;

export default async function WPTest() {
  // Test posts
  const { posts } = await wp.request(Q, { first: 1 }).catch((e) => {
    return { posts: { nodes: [] }, _err: String(e) };
  });

  // Test menu
  const menuItems = await getMainMenu();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">WordPress Connection Test</h1>
      
      {/* Posts Test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Posts Test</h2>
        {!posts?.nodes?.length ? (
          <pre className="p-4 bg-red-50 text-red-700 rounded">
            Couldn&apos;t fetch posts. Make sure WPGraphQL is enabled and you have at least one
            published Post. Check WP_GRAPHQL_ENDPOINT and network access.
          </pre>
        ) : (
          <div className="p-4 bg-green-50 text-green-700 rounded">
            <p>✅ Posts connection working!</p>
            <p>Latest post: <strong dangerouslySetInnerHTML={{ __html: posts.nodes[0].title }} /></p>
            <p>Slug: {posts.nodes[0].slug}</p>
            <p>Date: {new Date(posts.nodes[0].date).toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Menu Test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Menu Test</h2>
        {menuItems.length === 0 ? (
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
            <p>⚠️ No menu items found. This could mean:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The &quot;main-menu&quot; doesn&apos;t exist in WordPress</li>
              <li>The menu exists but has no items</li>
              <li>WPGraphQL doesn&apos;t have menu support enabled</li>
            </ul>
            <p className="mt-2">The navigation will fall back to default menu items.</p>
          </div>
        ) : (
          <div className="p-4 bg-green-50 text-green-700 rounded">
            <p>✅ Menu connection working! Found {menuItems.length} menu items:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.label}</strong> - {item.path || item.url}
                  {item.children && item.children.length > 0 && (
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <strong>{child.label}</strong> - {child.path || child.url}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="text-gray-600">You can delete this page once done.</p>
    </main>
  );
}