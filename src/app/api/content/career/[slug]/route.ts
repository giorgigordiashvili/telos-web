import { getContentBySlug } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const career = await getContentBySlug('career', slug);

    if (!career) {
      return NextResponse.json({ error: 'Career item not found' }, { status: 404 });
    }

    return NextResponse.json(career);
  } catch (error) {
    console.error(`Error fetching career item ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to fetch career item' }, { status: 500 });
  }
}
