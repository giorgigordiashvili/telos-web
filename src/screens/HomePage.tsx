'use client';

import FAQSection from '@/components/FaqSection';
import NewsCard from '@/components/NewsCard';
import PrimeryButton from '@/components/PrimeryButton';
import QuoteCarousel from '@/components/QuoteCarrousel';
import ServicesList from '@/components/ServicesList';
import Typography from '@/components/Typography';
import { MoveDirection, OutMode } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link'; // Import Link from next/link

const useIsMobile = (breakpoint = 1280) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
};

const HomePageWrapper = styled.div``;

const BackgroundSection = styled.section`
  position: relative;
  width: 100%;
  height: 1057px;
  overflow: hidden;

  @media (max-width: 1280px) {
    height: 687px;
  }
`;

const StyledParticles = styled(Particles)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const OverlayContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-inline: 16px;
  flex-direction: column;
  gap: 24px;
`;

const StyledHeroText = styled(Typography)`
  color: #fff;
  text-shadow: 0px 7px 3.5px rgba(66, 120, 130, 0.56);
`;

const StyledParagraphMedium = styled(Typography)`
  color: #fff;
  text-shadow: 0px 7px 3.5px rgba(66, 120, 130, 0.56);
`;

const ExploreOurServices = styled.div`
  max-width: 205px;
`;

const MoreAboutOurFeatures = styled.div`
  max-width: 230px;
`;

const FeaturesSectionWrapper = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  padding-block: 48px;
`;

const Features = styled.div`
  max-width: 1152px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  @media (max-width: 1280px) {
    padding-inline: 16px;
  }
`;

const NewsSectionWrapper = styled.div`
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  justify-content: center;
  padding-block: 48px;
`;

const News = styled.div`
  max-width: 956px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1280px) {
    padding-inline: 16px;
  }
`;

const NewsCardWrapper = styled.div`
  max-width: 956px;
  width: 100%;
  padding-block: 48px;

  @media (max-width: 1280px) {
    padding-bottom: 0;
  }
`;

const StyledFeaturesText = styled(Typography)<{ $withPadding?: boolean }>`
  color: #031716;
  ${({ $withPadding }) => $withPadding && 'padding-bottom: 48px;'}
`;

const FAQSectionWrapper = styled.div`
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 96px;

  @media (max-width: 1280px) {
    padding-block: 48px;
  }
`;

const QuoteSectionWrapper = styled.div`
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-block: 96px;

  @media (max-width: 1280px) {
    padding-block: 48px;
  }
`;

// interface NewsItemFrontmatter {
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   thumbnail?: string;
// }

// interface NewsItem {
//   slug?: string;
//   frontmatter: NewsItemFrontmatter;
//   variant?: 'right' | 'left';
// }

interface BlogPostFrontmatter {
  title: string;
  date: string; // Assuming date is a string, adjust if it's a Date object
  subtitle?: string; // Added subtitle
  thumbnail?: string;
}

interface BlogPost {
  slug?: string;
  frontmatter: BlogPostFrontmatter;
  content: string; // <--- Add content here
}

interface QuoteItemFrontmatter {
  quote: string;
  author: string;
  company?: string;
  thumbnail?: string;
}

interface QuoteItem {
  slug?: string;
  frontmatter: QuoteItemFrontmatter;
}

interface FAQItemFrontmatter {
  question: string;
  answer: string;
}

interface FAQItem {
  slug?: string;
  frontmatter: FAQItemFrontmatter;
}

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [init, setInit] = useState(false);
  // const [newsItems, setNewsItems] = useState<NewsItem[]>([]); // State to hold news items
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // State to hold blog posts

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // Fetch blog posts
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/content/blog'); // Fetch blog posts
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data: BlogPost[] = await response.json();
        // Sort posts by date (newest first) and take the top 2
        const sortedPosts = data.sort(
          (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        );
        setBlogPosts(sortedPosts.slice(0, 2));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  const options = useMemo(
    () => ({
      background: { color: '#000000' },
      fpsLimit: 40,
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: '#E3E3E3' },
        shape: { type: 'polygon', polygon: { sides: 5 } },
        opacity: {
          value: 0.5,
          random: false,
          animation: { enable: false, speed: 1, minimumValue: 0.1, sync: false },
        },
        size: {
          value: 0.3,
          random: true,
          animation: { enable: false, speed: 40, minimumValue: 0.1, sync: false },
        },
        links: {
          enable: true,
          distance: 300,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 4.810236182596568,
          direction: MoveDirection.none,
          random: false,
          straight: false,
          outModes: { default: OutMode.out },
          bounce: false,
        },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: { enable: true },
        },
        modes: { repulse: { distance: 215.78421578421577, duration: 0.4 }, push: { quantity: 4 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <HomePageWrapper>
      <BackgroundSection>
        {init && <StyledParticles id="tsparticles" options={options} />}
        <OverlayContent>
          <StyledHeroText variant={isMobile ? 'h2' : 'h1'}>
            Innovative Software
            <br />
            Solutions for a<br />
            Digital World
          </StyledHeroText>
          <StyledParagraphMedium variant="paragraph-medium">
            Empowering businesses with cutting-edge web and mobile
            <br />
            applications built on Next.js and React Native.
          </StyledParagraphMedium>
          <ExploreOurServices>
            <Link href="/services" passHref>
              <PrimeryButton variant="blue">Explore Our Services</PrimeryButton>
            </Link>
          </ExploreOurServices>
        </OverlayContent>
      </BackgroundSection>

      <FeaturesSectionWrapper>
        <Features>
          <StyledFeaturesText variant={isMobile ? 'h3' : 'h2'}>Features</StyledFeaturesText>
          <ServicesList text="features" />
          <MoreAboutOurFeatures>
            <Link href="/services" passHref>
              <PrimeryButton variant="blue">More about our features</PrimeryButton>
            </Link>
          </MoreAboutOurFeatures>
        </Features>
      </FeaturesSectionWrapper>

      <NewsSectionWrapper>
        <News>
          <StyledFeaturesText variant={isMobile ? 'h3' : 'h2'}>News</StyledFeaturesText>
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => {
              // Generate a short excerpt from the content
              let excerpt = '';
              if (post.content) {
                const lines = post.content.split('\n'); // Split by actual newline characters
                const firstThreeLines = lines.slice(0, 3).join('\n'); // Join with actual newline characters
                if (lines.length > 3) {
                  excerpt = `${firstThreeLines}...`;
                } else {
                  excerpt = firstThreeLines;
                }
              }
              return (
                <NewsCardWrapper key={post.slug || index}>
                  <NewsCard
                    isMobile={isMobile}
                    variant={index % 2 === 0 ? 'right' : 'left'} // Alternate variant
                    title={post.frontmatter.title}
                    subtitle={excerpt} // Use excerpt from content
                    buttonText="Read More" // Static button text
                    thumbnail={post.frontmatter.thumbnail}
                    slug={post.slug}
                  />
                </NewsCardWrapper>
              );
            })
          ) : (
            <Typography variant="paragraph-medium">Loading news...</Typography>
          )}
        </News>
      </NewsSectionWrapper>

      <QuoteSectionWrapper>
        <StyledFeaturesText $withPadding variant={isMobile ? 'h3' : 'h2'}>
          Hear from our costumers
        </StyledFeaturesText>
        <QuoteCarousel />
      </QuoteSectionWrapper>

      <FAQSectionWrapper>
        <StyledFeaturesText $withPadding variant={isMobile ? 'h3' : 'h2'}>
          FAQ
        </StyledFeaturesText>
        <FAQSection />
      </FAQSectionWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
