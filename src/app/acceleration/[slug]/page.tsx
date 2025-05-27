import { getContentBySlug } from '@/lib/content';
import BlogDetailScreen from '@/screens/BlogDetailScreen'; // This might need to be an AccelerationDetailScreen
import { notFound } from 'next/navigation';

interface AccelerationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AccelerationDetailPageProps) {
  const resolvedParams = await params;
  const item = (await getContentBySlug('acceleration', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      date?: string; // Acceleration items might not have a date
      thumbnail?: string;
      tags?: string[];
      // Add any other specific frontmatter fields for acceleration
    };
    content: string;
  };

  if (!item) {
    return {
      title: 'Acceleration Item Not Found',
      description: 'The requested acceleration item could not be found.',
    };
  }

  return {
    title: `${item.frontmatter.title} | TELOS Acceleration`,
    description: item.content.substring(0, 160), // Or a specific description field if available
  };
}

export default async function AccelerationDetailPage({ params }: AccelerationDetailPageProps) {
  const resolvedParams = await params;
  const item = (await getContentBySlug('acceleration', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      date?: string;
      thumbnail?: string;
      tags?: string[];
      // Add any other specific frontmatter fields for acceleration
    };
    content: string;
  };

  if (!item) {
    notFound();
  }

  // Assuming BlogDetailScreen can be used or adapted.
  // If a specific AccelerationDetailScreen is needed, this should be changed.
  // For now, we'll pass the item as 'post' to match BlogDetailScreen's expected prop.
  return (
    <BlogDetailScreen
      post={{
        ...item,
        frontmatter: {
          ...item.frontmatter,
          date: item.frontmatter.date || new Date().toISOString(),
        },
      }}
    />
  );
}
