import { getContentBySlug } from '@/lib/content';
import PressDetailScreen from '@/screens/PressDetailScreen';
// Removed unused import for PageProps
import { notFound } from 'next/navigation';

interface PressDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PressDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const pressItem = await getContentBySlug('press', resolvedParams.slug);

  if (!pressItem) {
    return {
      title: 'Press Item Not Found',
      description: 'The requested press item could not be found.',
    };
  }

  return {
    title: `${pressItem.frontmatter.title} | TELOS Press`,
    description: pressItem.content.substring(0, 160),
  };
}

export default async function PressDetailPage({ params }: PressDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const pressItem = await getContentBySlug('press', resolvedParams.slug);

  if (!pressItem) {
    notFound();
  }

  return (
    <PressDetailScreen
      pressItem={
        pressItem as {
          slug: string;
          frontmatter: {
            title: string;
            date: string;
            source: string;
            image?: string;
            link?: string;
          };
          content: string;
        }
      }
    />
  );
}
