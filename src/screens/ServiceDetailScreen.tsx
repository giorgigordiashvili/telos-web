'use client';

import MarkdownContent from '@/components/MarkdownContent';
import PrimeryButton from '@/components/PrimeryButton';
import Typography from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface ServiceDetailScreenProps {
  service: {
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
  width: 100%;
  height: auto;
  padding: 96px 16px;
  margin: auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  gap: 48px;

  @media (max-width: 768px) {
    padding-top: 32px;
    padding-bottom: 48px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  position: relative;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const MarkdownContainer = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ service }) => {
  const { frontmatter, content } = service;

  return (
    <Container>
      <ContentContainer>
        <ServiceHeader>
          <IconContainer>
            <Image
              src={frontmatter.icon || '/images/ServicesCard/default_service_icon.png'}
              alt={frontmatter.title}
              fill
              sizes="80px"
              style={{ objectFit: 'contain' }}
            />
          </IconContainer>
          <div>
            <Typography variant="h1">{frontmatter.title}</Typography>
            <Typography variant="paragraph-medium">{frontmatter.shortDescription}</Typography>
          </div>
        </ServiceHeader>

        <MarkdownContainer>
          <MarkdownContent content={content} />
        </MarkdownContainer>

        <ButtonContainer>
          <Link href="/contact">
            <PrimeryButton variant="blue">Get in touch</PrimeryButton>
          </Link>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default ServiceDetailScreen;
