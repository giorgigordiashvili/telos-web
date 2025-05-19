import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to read and parse content files from a specific collection directory
async function getCollection(collectionName: string) {
  const contentDir = path.join(process.cwd(), 'src', 'content', collectionName);
  try {
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn(`Directory does not exist: ${contentDir}`);
      return []; // Return empty if directory doesn't exist
    }

    const files = fs.readdirSync(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    const entries = markdownFiles.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx?$/, '');
      return {
        id: slug, // Use slug as id
        slug,
        frontmatter: data, // Keep frontmatter under its own key
        content, // Markdown content
      };
    });

    // Sort entries by order if the order field exists in frontmatter
    if (
      entries.length > 0 &&
      entries[0].frontmatter &&
      typeof entries[0].frontmatter.order === 'number'
    ) {
      entries.sort((a, b) => (a.frontmatter.order as number) - (b.frontmatter.order as number));
    }

    return entries;
  } catch (error) {
    console.error(`Error reading collection ${collectionName}:`, error);
    throw new Error(`Failed to read collection ${collectionName}`);
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collectionName: string }> }
) {
  const { collectionName } = await params;

  if (!collectionName) {
    return NextResponse.json({ error: 'Collection name is required' }, { status: 400 });
  }

  try {
    const items = await getCollection(collectionName);
    if (items.length === 0) {
      // Optionally, you could return a 404 if no items are found,
      // or an empty array if that's preferred by the frontend.
      // console.log(`No items found for collection: ${collectionName}`);
    }
    return NextResponse.json(items, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Ensure fresh data
      },
    });
  } catch (error) {
    console.error(`API error for /api/content/${collectionName}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `Failed to fetch ${collectionName}`, details: errorMessage },
      { status: 500 }
    );
  }
}
