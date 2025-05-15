'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';
import ServicesList from '@/components/ServicesList';
import ServicesCard from '@/components/ServicesCard';

interface CareerContent {
  slug: string;
  frontmatter: {
    title: string;
    icon: string;
    shortDescription: string;
  };
  content: string;
}

const Container = styled.div`
  max-width: 1152px;
  margin: auto;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: normal;
  padding-block: 96px;
  gap: 48px;

  @media (max-width: 768px) {
    padding-top: 32px;
    padding-bottom: 48px;
    gap: 24px;
    padding-inline: 16px;
  }
`;

const CareerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

const ContainerWrapper = styled.div`
  margin-top: 60px;
  background-image: url('/images/order/back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const CareerScreen = () => {
  const [careerItems, setCareerItems] = useState<CareerContent[]>([]);

  useEffect(() => {
    const fetchCareerContent = async () => {
      try {
        const response = await fetch('/api/content/career');
        if (!response.ok) throw new Error('Failed to fetch career content');
        const data = await response.json();
        setCareerItems(data);
      } catch (error) {
        console.error('Error fetching career content:', error);
      }
    };

    fetchCareerContent();
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        <PageTitle text="Career" />

        {/* Company benefits section */}
        <ServicesList text="Career" />

        {/* Career opportunities section */}
        {careerItems.length > 0 && (
          <>
            <PageTitle text="Open Positions" subtitle="Join our team" />
            <CareerContainer>
              {careerItems.map(item => (
                <ServicesCard
                  key={item.slug}
                  title={item.frontmatter.title}
                  subtitle={item.frontmatter.shortDescription}
                  imageUrl={item.frontmatter.icon || '/images/ServicesCard/default.png'}
                  isCareer
                  showLearnMore
                  slug={item.slug}
                />
              ))}
            </CareerContainer>
          </>
        )}
      </Container>
    </ContainerWrapper>
  );
};

export default CareerScreen;
