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
  };
  content: string;
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
  {
    imageUrl: '/images/ServicesCard/frontend.png',
    title: 'Web App Development',
    subtitle: `We design and develop scalable, high-performance web applications tailored to your business needs using Next.js. From dynamic dashboards to e-commerce platforms, our solutions are optimized for user experience.`,
  },
  {
    imageUrl: '/images/ServicesCard/mobile.png',
    title: 'Mobile App Development',
    subtitle: `Our team builds responsive, cross-platform mobile applications with React Native, ensuring seamless functionality and a consistent user experience across Android and iOS devices.`,
  },
  {
    imageUrl: '/images/ServicesCard/backend.png',
    title: 'Backend Dev./API Integration',
    subtitle: `We specialize in developing secure, scalable backends using Node.js and Laravel, along with seamless integration of APIs to ensure your app communicates effectively with third-party services.`,
  },
  {
    imageUrl: '/images/ServicesCard/design.png',
    title: 'UI/UX Design and Prototyping',
    subtitle: `Our design team creates intuitive and visually appealing interfaces that align with your brand, ensuring an exceptional user journey from start to finish.`,
  },
];

const softwareServices = [
  {
    imageUrl: '/images/ServicesCard/backend.png',
    title: 'Backend Development',
    subtitle: `· Develop secure, scalable, and high-performance backend systems using Node.js, Laravel, and other modern technologies.\n\n· Create RESTful APIs and GraphQL endpoints for seamless data communication.\n\n· Handle server-side logic, database architecture, and cloud integration.`,
  },
  {
    imageUrl: '/images/ServicesCard/frontend.png',
    title: 'Frontend Development',
    subtitle: `· Build responsive and interactive web interfaces using React.js and Next.js.\n\n· Implement dynamic features, animations, and intuitive user flows.\n\n· Ensure cross-browser compatibility and SEO optimization.`,
  },
  {
    imageUrl: '/images/ServicesCard/mobile.png',
    title: 'Mobile Development',
    subtitle: `· Develop cross-platform mobile applications with React Native.· Create native-like performance and seamless UX for Android and iOS.· Integrate APIs, payment gateways, and real-time notifications.`,
  },
];

const marketingService = {
  imageUrl: '/images/ServicesCard/design.png',
  title: 'Design',
  subtitle: `· Create visually stunning UI/UX designs tailored to your brand identity.\n\n· Develop prototypes and wireframes for rapid validation of ideas.\n\n· Deliver design systems and reusable components.`,
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
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [careerItems, setCareerItems] = useState<ServiceContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Fetch services from CMS
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // For services section
        if (text === 'features' || text === 'Software') {
          const response = await fetch('/api/content/services');
          if (!response.ok) throw new Error('Failed to fetch services');
          const data = await response.json();
          setServices(data);
        }

        // For career section
        if (text === 'Career') {
          const response = await fetch('/api/content/career');
          if (!response.ok) throw new Error('Failed to fetch career items');
          const data = await response.json();
          setCareerItems(data);
        }
      } catch (error) {
        console.error(`Error fetching content for ${text}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [text]);

  // Determine heading variant
  let headingVariant: 'h1' | 'h2' | 'h3' | 'h4';
  if (text === 'Career') {
    headingVariant = isMobile ? 'h4' : 'h2';
  } else if (text === 'Software' || text === 'Marketing') {
    headingVariant = 'h4';
  } else {
    headingVariant = isMobile ? 'h3' : 'h1';
  }

  // Use CMS services when available, otherwise fall back to hardcoded services
  const renderServices = () => {
    if (isLoading) {
      return <p>Loading services...</p>;
    }

    // If we have services from CMS and this is the features or Software section, use them
    if (services.length > 0 && (text === 'features' || text === 'Software')) {
      const servicesToDisplay = text === 'features' ? services.slice(0, 4) : services;

      if (text === 'features') {
        return (
          <FeaturesContainer>
            {servicesToDisplay.map(service => (
              <ServicesCard
                key={service.slug}
                imageUrl={
                  service.frontmatter.icon || '/images/ServicesCard/default_service_icon.png'
                }
                title={service.frontmatter.title}
                subtitle={service.frontmatter.shortDescription}
                showLearnMore
                isFeature
                slug={service.slug}
              />
            ))}
            <ServicesCard
              key="marketing-service-feature-cms"
              imageUrl={marketingService.imageUrl}
              title={marketingService.title}
              subtitle={marketingService.subtitle}
              showLearnMore
              isFeature
            />
          </FeaturesContainer>
        );
      } else {
        return (
          <Container>
            {servicesToDisplay.map(service => (
              <ServicesCard
                key={service.slug}
                imageUrl={
                  service.frontmatter.icon || '/images/ServicesCard/default_service_icon.png'
                }
                title={service.frontmatter.title}
                subtitle={service.frontmatter.shortDescription}
                slug={service.slug}
              />
            ))}
          </Container>
        );
      }
    }

    // If we have career items from CMS, use them
    if (careerItems.length > 0 && text === 'Career') {
      return (
        <Container>
          {careerItems.map(item => (
            <ServicesCard
              key={item.slug}
              imageUrl={item.frontmatter.icon || '/images/ServicesCard/default_service_icon.png'}
              title={item.frontmatter.title}
              subtitle={item.frontmatter.shortDescription}
              isCareer
            />
          ))}
        </Container>
      );
    }

    // Fall back to hardcoded services if no CMS data or for other sections
    if (text === 'Software') {
      return (
        <Container>
          {softwareServices.map((service, index) => (
            <ServicesCard
              key={index}
              imageUrl={service.imageUrl}
              title={service.title}
              subtitle={service.subtitle}
            />
          ))}
        </Container>
      );
    } else if (text === 'Marketing') {
      return (
        <ServicesCard
          imageUrl={marketingService.imageUrl}
          title={marketingService.title}
          subtitle={marketingService.subtitle}
        />
      );
    } else if (text === 'Career') {
      // Use CMS career items if available, otherwise fall back to hardcoded ones
      if (careerItems.length > 0) {
        return (
          <Container>
            {careerItems.map(item => (
              <ServicesCard
                key={item.slug}
                imageUrl={item.frontmatter.icon || '/images/ServicesCard/default_service_icon.png'}
                title={item.frontmatter.title}
                subtitle={item.frontmatter.shortDescription}
                isCareer
                slug={item.slug}
              />
            ))}
          </Container>
        );
      } else {
        return (
          <Container>
            {careerServices.map((service, index) => (
              <ServicesCard
                key={index}
                imageUrl={service.imageUrl}
                title={service.title}
                subtitle={service.subtitle}
                isCareer
              />
            ))}
          </Container>
        );
      }
    } else {
      // Features section with hardcoded data
      return (
        <FeaturesContainer>
          {featuresServices.map((service, index) => (
            <ServicesCard
              key={`feature-${index}`}
              imageUrl={service.imageUrl}
              title={service.title}
              subtitle={service.subtitle}
              showLearnMore
              isFeature
            />
          ))}
          <ServicesCard
            key="marketing-service-feature-hardcoded"
            imageUrl={marketingService.imageUrl}
            title={marketingService.title}
            subtitle={marketingService.subtitle}
            showLearnMore
            isFeature
          />
        </FeaturesContainer>
      );
    }
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
