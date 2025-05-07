import { getContentBySlug } from '@/lib/content';
import ServiceDetailScreen from '@/screens/ServiceDetailScreen';
import { notFound } from 'next/navigation';
// Define PageProps locally if needed
interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const service = (await getContentBySlug('services', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      icon: string;
      shortDescription: string;
    };
    content: string;
  };

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.frontmatter.title} | TELOS LLC Services`,
    description: service.frontmatter.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // Await the params object before using its properties
  const resolvedParams = await params;
  const service = (await getContentBySlug('services', resolvedParams.slug)) as {
    slug: string;
    frontmatter: {
      title: string;
      icon: string;
      shortDescription: string;
    };
    content: string;
  };

  if (!service) {
    notFound();
  }

  return <ServiceDetailScreen service={service} />;
}
