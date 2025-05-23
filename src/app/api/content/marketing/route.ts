import { getAllContent } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const marketing = await getAllContent('marketing');
    return NextResponse.json(marketing);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch marketing content' }, { status: 500 });
  }
}
