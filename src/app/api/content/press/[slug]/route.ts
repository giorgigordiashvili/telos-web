import { getContentBySlug } from '@/lib/content';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const pressItem = await getContentBySlug('press', (await params).slug);
    if (!pressItem) {
      return NextResponse.json({ error: 'Press item not found' }, { status: 404 });
    }
    return NextResponse.json(pressItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch press item' }, { status: 500 });
  }
}
