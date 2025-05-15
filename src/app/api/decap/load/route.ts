import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to read content files from a directory
async function readContentFromDir(dir: string) {
  try {
    const contentDir = path.join(process.cwd(), dir);
    console.log(`Reading content from: ${contentDir}`);
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn(`Directory does not exist: ${contentDir}`);
      return [];
    }

    // Get all files in the directory
    const files = fs.readdirSync(contentDir);
    console.log(`Found ${files.length} files in ${dir}`);
    
    // Filter markdown files
    const markdownFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    console.log(`Found ${markdownFiles.length} markdown files in ${dir}`);
    
    // Map through files and parse them
    const entries = markdownFiles.map(file => {
      // Read file content
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter and content
      const { data, content: markdownContent } = matter(content);
      
      // Generate slug from filename (remove extension)
      const slug = file.replace(/\.mdx?$/, '');
      
      console.log(`Processed file ${file} with slug: ${slug}`);
      
      // Return in format expected by Decap CMS test-repo backend
      return {
        slug,
        file: {
          path: filePath
        },
        data,
        raw: content
      };
    });
    
    return entries;
  } catch (error) {
    console.error(`Error reading content from ${dir}:`, error);
    return [];
  }
}

// API handler
export async function GET() {
  try {
    console.log('API route /api/decap/load was called');
    
    // Define your content directories
    const collections = {
      blog: 'src/content/blog',
      services: 'src/content/services',
      press: 'src/content/press',
      career: 'src/content/career',
    };
    
    // Load entries for each collection
    const entries: Record<string, any[]> = {};
    
    for (const [collection, dir] of Object.entries(collections)) {
      console.log(`Processing collection: ${collection}`);
      entries[collection] = await readContentFromDir(dir);
    }
    
    console.log('Successfully loaded content:', 
      Object.entries(entries).map(([key, val]) => `${key}: ${val.length} entries`).join(', ')
    );
    
    // Return as JSON with CORS headers
    return NextResponse.json(entries, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to load content', message: (error as Error).message },
      { status: 500 }
    );
  }
}
