import { getAllContent } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getAllContent('blog');
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
