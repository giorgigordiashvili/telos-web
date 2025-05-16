'use client';

import React from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';
import MarkdownContent from '@/components/MarkdownContent';
import Image from 'next/image';

interface CareerDetailScreenProps {
  career: {
    slug: string;
    frontmatter: {
      title: string;
      icon: string;
      shortDescription: string;
    };
    content: string;
  };
}

const Container = styled.div`
  max-width: 1152px;
  margin: auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  padding-block: 96px;
  gap: 48px;

  @media (max-width: 1280px) {
    padding: 32px 16px 48px 16px;
    gap: 32px;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: white;
  border-radius: 24px;
  padding: 48px;

  @media (max-width: 1280px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 1280px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;

  @media (max-width: 1280px) {
    width: 60px;
    height: 60px;
  }
`;

const CareerDetailScreen = ({ career }: CareerDetailScreenProps) => {
  return (
    <ContainerWrapper>
      <Container>
        <HeaderWrapper>
          {career.frontmatter.icon && (
            <IconWrapper>
              <Image
                src={career.frontmatter.icon}
                alt={career.frontmatter.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </IconWrapper>
          )}
          <PageTitle text={career.frontmatter.title} subtitle="Career Opportunity" />
        </HeaderWrapper>
        <ContentWrapper>
          <MarkdownContent content={career.content} />
        </ContentWrapper>
      </Container>
    </ContainerWrapper>
  );
};

export default CareerDetailScreen;
