'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';
import Image from 'next/image';
import PrimeryButton from '@/components/PrimeryButton';
import ServicesList from '@/components/ServicesList';
import NewsCard from '@/components/NewsCard';
import FAQSection from '@/components/FaqSection';
import QuoteCarousel from '@/components/QuoteCarrousel';

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
    height: 627px;
  }
`;

const BackgroundImage = styled(Image)`
  object-fit: cover;
  z-index: -1;
`;

const OverlayContent = styled.div`
  margin-top: 60px;
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

const ExploreOurServicesWrapper = styled.div`
  width: 205px;
`;

const MoreAboutOurFeatures = styled.div`
  width: 230px;
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

// Conditionally apply padding-bottom only when $withPadding is true
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

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <HomePageWrapper>
      <BackgroundSection>
        <BackgroundImage src="/images/HomePage/background.png" alt="background" fill priority />
        <OverlayContent>
          <StyledHeroText variant={isMobile ? 'h2' : 'h1'}>
            Innovative Software
            <br />
            Solutions for a
            <br />
            Digital World
          </StyledHeroText>

          <StyledParagraphMedium variant="paragraph-medium">
            Empowering businesses with cutting-edge web and mobile
            <br />
            applications built on Next.js and React Native.
          </StyledParagraphMedium>

          <ExploreOurServicesWrapper>
            <PrimeryButton variant="blue">Explore Our Services</PrimeryButton>
          </ExploreOurServicesWrapper>
        </OverlayContent>
      </BackgroundSection>

      <FeaturesSectionWrapper>
        <Features>
          <StyledFeaturesText variant={isMobile ? 'h3' : 'h2'}>Features</StyledFeaturesText>
          <ServicesList text="features" />
          <MoreAboutOurFeatures>
            <PrimeryButton variant="blue">More about our features</PrimeryButton>
          </MoreAboutOurFeatures>
        </Features>
      </FeaturesSectionWrapper>

      <NewsSectionWrapper>
        <News>
          <StyledFeaturesText variant={isMobile ? 'h3' : 'h2'}>News</StyledFeaturesText>
          <NewsCardWrapper>
            <NewsCard isMobile={isMobile} variant="right" />
          </NewsCardWrapper>
          <NewsCardWrapper>
            <NewsCard isMobile={isMobile} variant="left" />
          </NewsCardWrapper>
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
