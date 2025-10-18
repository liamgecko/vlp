import { NextRequest, NextResponse } from 'next/server';
import { getPageBySlug } from '@/lib/wp';

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const page = await getPageBySlug(slug);
    
    if (!page) {
      return NextResponse.json({ featuredImage: null });
    }

    return NextResponse.json({ featuredImage: page.featuredImage });
  } catch (error) {
    console.error('Error fetching page featured image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
