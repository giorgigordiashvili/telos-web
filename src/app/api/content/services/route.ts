import { getAllContent } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await getAllContent('services');
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
