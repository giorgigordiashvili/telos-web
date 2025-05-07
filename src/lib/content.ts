import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'src/content');

/**
 * Get all content files from a specific collection
 * @param collection The collection name (blog, services, press)
 * @returns Array of content items with frontmatter and slug
 */
export async function getAllContent(collection: string) {
  const directory = path.join(contentDirectory, collection);

  // Check if directory exists
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);

  const content = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(directory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data,
        content,
      };
    });

  return content;
}

/**
 * Get a specific content file by slug from a collection
 * @param collection The collection name (blog, services, press)
 * @param slug The slug of the content item
 * @returns The content item with frontmatter and content
 */
export async function getContentBySlug(collection: string, slug: string) {
  const fullPath = path.join(contentDirectory, collection, `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}
