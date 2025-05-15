import { getAllContent } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const content = await getAllContent('career');
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching career content:', error);
    return NextResponse.json({ error: 'Failed to fetch career content' }, { status: 500 });
  }
}
