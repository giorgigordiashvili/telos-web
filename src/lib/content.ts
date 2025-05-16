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
  console.log(`Looking for ${collection} content in directory: ${directory}`);

  // Check if directory exists
  if (!fs.existsSync(directory)) {
    console.log(`Directory does not exist: ${directory}`);
    return [];
  }

  try {
    const files = fs.readdirSync(directory);
    console.log(`Found ${files.length} files in ${collection} directory`);

    const mdFiles = files.filter(file => file.endsWith('.md'));
    console.log(
      `Found ${mdFiles.length} markdown files in ${collection} directory: ${mdFiles.join(', ')}`
    );

    const content = mdFiles
      .map(file => {
        const slug = file.replace(/\.md$/, '');
        const fullPath = path.join(directory, file);

        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            frontmatter: data,
            content,
          };
        } catch (error) {
          console.error(`Error processing file ${fullPath}:`, error);
          return null;
        }
      })
      .filter(Boolean); // Filter out null values from any failed processing

    console.log(`Successfully processed ${content.length} content items for ${collection}`);
    return content;
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
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
