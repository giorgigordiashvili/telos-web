import { getContentBySlug } from '@/lib/content';
import CareerDetailScreen from '@/screens/CareerDetailScreen';
import { notFound } from 'next/navigation';

interface CareerDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const career = (await getContentBySlug('career', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      icon: string;
      shortDescription: string;
    };
    content: string;
  };

  if (!career) {
    return {
      title: 'Career Not Found',
      description: 'The requested career opportunity could not be found.',
    };
  }

  return {
    title: `${career.frontmatter.title} | TELOS LLC Career`,
    description: career.frontmatter.shortDescription,
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const career = (await getContentBySlug('career', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      icon: string;
      shortDescription: string;
    };
    content: string;
  };

  if (!career) {
    notFound();
  }

  return <CareerDetailScreen career={career} />;
}
