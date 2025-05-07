import { getAllContent } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pressItems = await getAllContent('press');
    return NextResponse.json(pressItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch press items' }, { status: 500 });
  }
}
