import { getContentBySlug } from '@/lib/content';
import BlogDetailScreen from '@/screens/BlogDetailScreen';
// Removed unused import for PageProps
import { notFound } from 'next/navigation';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const post = (await getContentBySlug('blog', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      thumbnail?: string;
      tags?: string[];
    };
    content: string;
  };

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.frontmatter.title} | TELOS Blog`,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const post = (await getContentBySlug('blog', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      thumbnail?: string;
      tags?: string[];
    };
    content: string;
  };

  if (!post) {
    notFound();
  }

  return <BlogDetailScreen post={post} />;
}
