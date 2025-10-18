import { wp } from '@/lib/wp';

export const revalidate = 0; // no cache while testing

const Q = /* GraphQL */ `
  query Posts($first:Int=1){
    posts(first:$first, where:{orderby:{field:DATE, order:DESC}}){
      nodes{ id title slug date }
    }
  }
`;

export default async function WPTest() {
  const { posts } = await wp.request(Q, { first: 1 }).catch((e) => {
    return { posts: { nodes: [] }, _err: String(e) };
  });

  if (!posts?.nodes?.length) {
    return (
      <pre className="p-4 bg-red-50 text-red-700 rounded">
        Couldn’t fetch posts. Make sure WPGraphQL is enabled and you have at least one
        published Post. Check WP_GRAPHQL_ENDPOINT and network access.
      </pre>
    );
  }

  const p = posts.nodes[0];
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">WP connection OK ✅</h1>
      <p>Latest post: <strong dangerouslySetInnerHTML={{ __html: p.title }} /></p>
      <p>Slug: {p.slug}</p>
      <p>Date: {new Date(p.date).toLocaleString()}</p>
      <p className="mt-4 text-gray-600">You can delete this page once done.</p>
    </main>
  );
}