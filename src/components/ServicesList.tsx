'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ServicesCard from './ServicesCard';
import Typography from './Typography';

type Props = {
  text: 'Software' | 'Marketing' | 'Career' | 'features';
};

// Interface for service content from CMS
interface ServiceContent {
  slug: string;
  frontmatter: {
    title: string;
    icon: string;
    shortDescription: string;
    order?: number; // Added for sorting
  };
  content: string; // Assuming content might be used elsewhere or for detail pages
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const Container = styled.div`
  width: 1152px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: nowrap;

  @media (max-width: 1280px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Heading = styled(Typography)<{ $center?: boolean }>`
  align-self: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`;

const featuresServices = [
  // Hardcoded fallback for general features
  {
    imageUrl: '/images/ServicesCard/frontend.png',
    title: 'Web App Development',
    subtitle: `We design and develop scalable, high-performance web applications tailored to your business needs using Next.js. From dynamic dashboards to e-commerce platforms, our solutions are optimized for user experience.`,
    slug: 'web-app-development-feature',
  },
  {
    imageUrl: '/images/ServicesCard/mobile.png',
    title: 'Mobile App Development',
    subtitle: `Our team builds responsive, cross-platform mobile applications with React Native, ensuring seamless functionality and a consistent user experience across Android and iOS devices.`,
    slug: 'mobile-app-development-feature',
  },
  {
    imageUrl: '/images/ServicesCard/backend.png',
    title: 'Backend Dev./API Integration',
    subtitle: `We specialize in developing secure, scalable backends using Node.js and Laravel, along with seamless integration of APIs to ensure your app communicates effectively with third-party services.`,
    slug: 'backend-dev-api-integration-feature',
  },
  // Note: UI/UX is intentionally part of this list as a general fallback if not found in marketing CMS
  {
    imageUrl: '/images/ServicesCard/design.png',
    title: 'UI/UX Design and Prototyping',
    subtitle: `Our design team creates intuitive and visually appealing interfaces that align with your brand, ensuring an exceptional user journey from start to finish.`,
    slug: 'ui-ux-design-and-prototyping-general-feature',
  },
];

const softwareServices = [
  {
    imageUrl: '/images/ServicesCard/backend.png',
    title: 'Backend Development',
    subtitle: `· Develop secure, scalable, and high-performance backend systems using Node.js, Laravel, and other modern technologies.\n\n· Create RESTful APIs and GraphQL endpoints for seamless data communication.\n\n· Handle server-side logic, database architecture, and cloud integration.`,
    slug: 'backend-development-sw',
  },
  {
    imageUrl: '/images/ServicesCard/frontend.png',
    title: 'Frontend Development',
    subtitle: `· Build responsive and interactive web interfaces using React.js and Next.js.\n\n· Implement dynamic features, animations, and intuitive user flows.\n\n· Ensure cross-browser compatibility and SEO optimization.`,
    slug: 'frontend-development-sw',
  },
  {
    imageUrl: '/images/ServicesCard/mobile.png',
    title: 'Mobile Development',
    subtitle: `· Develop cross-platform mobile applications with React Native.· Create native-like performance and seamless UX for Android and iOS.· Integrate APIs, payment gateways, and real-time notifications.`,
    slug: 'mobile-development-sw',
  },
];

// Renamed for clarity: This is the fallback for the entire /marketing page if CMS fails
const marketingPageFallbackService = {
  imageUrl: '/images/ServicesCard/design.png', // Generic marketing icon
  title: 'Our Marketing Solutions', // Generic title
  subtitle: 'Discover how our marketing services can boost your business.',
  slug: 'marketing-page-fallback',
};

// Specific fallback for the "UI/UX Design and Prototyping" service when used in features.
const uiUxServiceSpecificFallback = {
  imageUrl: '/images/ServicesCard/design.png',
  title: 'UI/UX Design and Prototyping',
  subtitle: `Our design team creates intuitive and visually appealing interfaces that align with your brand, ensuring an exceptional user journey from start to finish.`,
  slug: 'ui-ux-design-feature-fallback',
};

const careerServices = [
  {
    imageUrl: '/images/ServicesCard/default_service_icon.png',
    title: 'Knowledge Sharing',
    subtitle: 'type description here, what this services offers client',
  },
  {
    imageUrl: '/images/ServicesCard/default_service_icon.png',
    title: 'Personal Growth',
    subtitle: 'type description here, what this services offers client',
  },
  {
    imageUrl: '/images/ServicesCard/default_service_icon.png',
    title: 'Events & Occasions',
    subtitle: 'type description here, what this services offers client',
  },
  {
    imageUrl: '/images/ServicesCard/default_service_icon.png',
    title: 'Ambassador Program',
    subtitle: 'type description here, what this services offers client',
  },
  {
    imageUrl: '/images/ServicesCard/default_service_icon.png',
    title: 'Relocation Opportunities',
    subtitle: 'type description here, what this services offers client',
  },
  {
    imageUrl: '/images/ServicesCard/default_service_icon.png',
    title: 'Internal Activities',
    subtitle: 'type description here, what this services offers client',
  },
];

const ServicesList: React.FC<Props> = ({ text }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [generalCmsServices, setGeneralCmsServices] = useState<ServiceContent[]>([]);
  const [marketingCmsServices, setMarketingCmsServices] = useState<ServiceContent[]>([]);
  const [careerCmsItems, setCareerCmsItems] = useState<ServiceContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateWidth = () => setIsMobile(window.innerWidth <= 768);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (text === 'features') {
          const [servicesRes, marketingRes] = await Promise.all([
            fetch('/api/content/services').catch(e => {
              console.error('Features: Failed to fetch general services', e);
              return null;
            }),
            fetch('/api/content/marketing').catch(e => {
              console.error('Features: Failed to fetch marketing services', e);
              return null;
            }),
          ]);

          let servicesData: ServiceContent[] = [];
          if (servicesRes && servicesRes.ok) {
            servicesData = await servicesRes.json();
            if (servicesData.length > 0 && servicesData[0]?.frontmatter?.order !== undefined) {
              servicesData.sort(
                (a, b) => (a.frontmatter.order || Infinity) - (b.frontmatter.order || Infinity)
              );
            }
          }
          setGeneralCmsServices(servicesData);

          let marketingData: ServiceContent[] = [];
          if (marketingRes && marketingRes.ok) {
            marketingData = await marketingRes.json();
            // No specific sort for all marketing items here, will find UI/UX by title/slug
          }
          setMarketingCmsServices(marketingData);
        } else if (text === 'Software') {
          const response = await fetch('/api/content/services');
          if (!response.ok) throw new Error('Failed to fetch software services');
          let data: ServiceContent[] = await response.json();
          if (data.length > 0 && data[0]?.frontmatter?.order !== undefined) {
            data.sort(
              (a, b) => (a.frontmatter.order || Infinity) - (b.frontmatter.order || Infinity)
            );
          }
          setGeneralCmsServices(data);
        } else if (text === 'Marketing') {
          const response = await fetch('/api/content/marketing');
          if (!response.ok) throw new Error('Failed to fetch marketing services');
          let data: ServiceContent[] = await response.json();
          if (data.length > 0 && data[0]?.frontmatter?.order !== undefined) {
            data.sort(
              (a, b) => (a.frontmatter.order || Infinity) - (b.frontmatter.order || Infinity)
            );
          }
          setMarketingCmsServices(data);
        } else if (text === 'Career') {
          const response = await fetch('/api/content/career');
          if (!response.ok) throw new Error('Failed to fetch career items');
          let data: ServiceContent[] = await response.json();
          if (data.length > 0 && data[0]?.frontmatter?.order !== undefined) {
            data.sort(
              (a, b) => (a.frontmatter.order || Infinity) - (b.frontmatter.order || Infinity)
            );
          }
          setCareerCmsItems(data);
        }
      } catch (err) {
        console.error(`Critical error fetching content for ${text}:`, err);
        setError((err as Error).message);
        setGeneralCmsServices([]);
        setMarketingCmsServices([]);
        setCareerCmsItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [text]);

  let headingVariant: 'h1' | 'h2' | 'h3' | 'h4' = 'h2';
  if (text === 'Career') headingVariant = isMobile ? 'h4' : 'h2';
  else if (text === 'Software' || text === 'Marketing') headingVariant = 'h4';
  else if (text === 'features') headingVariant = isMobile ? 'h3' : 'h1';

  const renderServices = () => {
    if (isLoading) return <Typography variant="paragraph-medium">Loading services...</Typography>;

    // Generic error display for non-feature pages if a critical fetch error occurred
    if (error && text !== 'features') {
      return (
        <Typography variant="paragraph-medium" style={{ color: 'red' }}>
          Error loading {text} services. Please try again later.
        </Typography>
      );
    }

    if (text === 'features') {
      let finalFeatureItems: any[] = [];
      const uiUxTargetTitle = 'UI/UX Design and Prototyping';
      const uiUxTargetSlug = 'ui-ux-design-and-prototyping'; // A potential slug to look for

      // 1. Get general services (CMS or fallback), excluding UI/UX, limit to 3
      const generalServicesSource =
        generalCmsServices.length > 0 ? generalCmsServices : featuresServices;
      const generalItems = generalServicesSource
        .filter(s => (s.frontmatter?.title || s.title) !== uiUxTargetTitle)
        .slice(0, 3);
      finalFeatureItems.push(...generalItems);

      // 2. Find the UI/UX Design and Prototyping service
      let uiUxItem: any = null;
      // Priority 1: Marketing CMS
      if (marketingCmsServices.length > 0) {
        uiUxItem = marketingCmsServices.find(
          item => item.frontmatter.title === uiUxTargetTitle || item.slug === uiUxTargetSlug
        );
      }
      // Priority 2: General CMS services (if it was there and not filtered out, e.g. if generalCmsServices was empty and featuresServices was used)
      if (!uiUxItem && generalCmsServices.length > 0) {
        uiUxItem = generalCmsServices.find(
          item => item.frontmatter.title === uiUxTargetTitle || item.slug === uiUxTargetSlug
        );
      }
      // Priority 3: Hardcoded featuresServices array (if not found in CMS)
      if (!uiUxItem) {
        uiUxItem = featuresServices.find(s => s.title === uiUxTargetTitle);
      }
      // Priority 4: Specific UI/UX fallback object
      if (!uiUxItem) {
        uiUxItem = uiUxServiceSpecificFallback;
      }

      // 3. Add UI/UX item if found and list has space (or replace to ensure it's there)
      if (uiUxItem) {
        const isUiUxAlreadyInList = finalFeatureItems.some(
          item => (item.frontmatter?.title || item.title) === uiUxTargetTitle
        );
        if (!isUiUxAlreadyInList) {
          if (finalFeatureItems.length < 4) {
            finalFeatureItems.push(uiUxItem);
          } else {
            // If list is full (3 general items), replace the last one if it's not UI/UX
            finalFeatureItems[3] = uiUxItem;
          }
        }
      }

      // 4. If still less than 4 items, try to fill with more general services (non-UI/UX, non-duplicates)
      if (finalFeatureItems.length < 4) {
        const needed = 4 - finalFeatureItems.length;
        const additionalGeneral = generalServicesSource
          .filter(s => {
            const title = s.frontmatter?.title || s.title;
            return (
              title !== uiUxTargetTitle &&
              !finalFeatureItems.some(fi => (fi.frontmatter?.title || fi.title) === title)
            );
          })
          .slice(0, needed);
        finalFeatureItems.push(...additionalGeneral);
      }

      if (finalFeatureItems.length === 0 && !isLoading) {
        if (error)
          return (
            <Typography variant="paragraph-medium" style={{ color: 'red' }}>
              Error loading features. Fallback data also unavailable.
            </Typography>
          );
        return (
          <Typography variant="paragraph-medium">No features to display at the moment.</Typography>
        );
      }

      return (
        <FeaturesContainer>
          {finalFeatureItems.slice(0, 4).map(
            (
              service,
              index // Ensure max 4
            ) => (
              <ServicesCard
                key={(service as ServiceContent).slug || (service as any).title || index}
                imageUrl={
                  (service as ServiceContent).frontmatter?.icon ||
                  (service as any).imageUrl ||
                  '/images/ServicesCard/default_service_icon.png'
                }
                title={(service as ServiceContent).frontmatter?.title || (service as any).title}
                subtitle={
                  (service as ServiceContent).frontmatter?.shortDescription ||
                  (service as any).subtitle
                }
                showLearnMore
                isFeature
                slug={(service as ServiceContent).slug} // Pass slug for navigation
              />
            )
          )}
        </FeaturesContainer>
      );
    }

    // Logic for 'Software'
    if (text === 'Software') {
      const itemsToDisplay = generalCmsServices.length > 0 ? generalCmsServices : softwareServices;
      if (itemsToDisplay.length === 0 && !isLoading)
        return <Typography variant="paragraph-medium">No software services available.</Typography>;
      return (
        <Container>
          {itemsToDisplay.map((service, index) => (
            <ServicesCard
              key={(service as ServiceContent).slug || (service as any).title || index}
              imageUrl={
                (service as ServiceContent).frontmatter?.icon ||
                (service as any).imageUrl ||
                '/images/ServicesCard/default_service_icon.png'
              }
              title={(service as ServiceContent).frontmatter?.title || (service as any).title}
              subtitle={
                (service as ServiceContent).frontmatter?.shortDescription ||
                (service as any).subtitle
              }
              slug={(service as ServiceContent).slug}
            />
          ))}
        </Container>
      );
    }

    // Logic for 'Marketing' page
    if (text === 'Marketing') {
      const itemsToDisplay =
        marketingCmsServices.length > 0 ? marketingCmsServices : [marketingPageFallbackService]; // Fallback to a single card for the page
      if (itemsToDisplay.length === 0 && !isLoading) {
        // Should not happen if fallback is an array
        return <Typography variant="paragraph-medium">No marketing services available.</Typography>;
      }
      if (marketingCmsServices.length === 0 && !isLoading && error) {
        // If CMS fetch failed
        return (
          <ServicesCard
            imageUrl={marketingPageFallbackService.imageUrl}
            title={marketingPageFallbackService.title}
            subtitle={marketingPageFallbackService.subtitle}
            slug={marketingPageFallbackService.slug}
          />
        );
      }
      return (
        <Container>
          {itemsToDisplay.map((item, index) => (
            <ServicesCard
              key={(item as ServiceContent).slug || (item as any).title || index}
              imageUrl={
                (item as ServiceContent).frontmatter?.icon ||
                (item as any).imageUrl ||
                '/images/ServicesCard/default_service_icon.png'
              }
              title={(item as ServiceContent).frontmatter?.title || (item as any).title}
              subtitle={
                (item as ServiceContent).frontmatter?.shortDescription || (item as any).subtitle
              }
              slug={(item as ServiceContent).slug}
            />
          ))}
        </Container>
      );
    }

    // Logic for 'Career'
    if (text === 'Career') {
      const itemsToDisplay = careerCmsItems.length > 0 ? careerCmsItems : careerServices;
      if (itemsToDisplay.length === 0 && !isLoading)
        return <Typography variant="paragraph-medium">No career benefits listed.</Typography>;
      return (
        <Container>
          {itemsToDisplay.map((service, index) => (
            <ServicesCard
              key={(service as ServiceContent).slug || (service as any).title || index}
              imageUrl={
                (service as ServiceContent).frontmatter?.icon ||
                (service as any).imageUrl ||
                '/images/ServicesCard/default_service_icon.png'
              }
              title={(service as ServiceContent).frontmatter?.title || (service as any).title}
              subtitle={
                (service as ServiceContent).frontmatter?.shortDescription ||
                (service as any).subtitle
              }
              isCareer
              slug={(service as ServiceContent).slug}
            />
          ))}
        </Container>
      );
    }
    return null; // Should not be reached if text prop is valid
  };

  return (
    <Wrapper>
      {text !== 'features' && (
        <Heading variant={headingVariant} $center={text === 'Career'}>
          {text === 'Career' ? 'Company Benefits' : text}
        </Heading>
      )}
      {renderServices()}
    </Wrapper>
  );
};

export default ServicesList;
