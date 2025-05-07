'use client';

import MarkdownContent from '@/components/MarkdownContent';
import PrimeryButton from '@/components/PrimeryButton';
import Typography from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface PressDetailScreenProps {
  pressItem: {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      source: string;
      image?: string;
      link?: string;
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
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const HeaderImage = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const PressMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
`;

const Source = styled(Typography)`
  color: #031716;
  font-weight: bold;
`;

const PublishDate = styled(Typography)`
  color: #666666;
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
  justify-content: space-between;
  margin-top: 48px;
`;

// Format date to a readable string
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

const PressDetailScreen: React.FC<PressDetailScreenProps> = ({ pressItem }) => {
  const { frontmatter, content } = pressItem;
  const formattedDate = formatDate(frontmatter.date);

  return (
    <Container>
      <ContentContainer>
        <Typography variant="h1">{frontmatter.title}</Typography>

        {frontmatter.image && (
          <HeaderImage>
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </HeaderImage>
        )}

        <PressMeta>
          <Source variant="h4">Source: {frontmatter.source}</Source>
          <PublishDate variant="paragraph-medium">Published on {formattedDate}</PublishDate>
        </PressMeta>

        <MarkdownContainer>
          <MarkdownContent content={content} />
        </MarkdownContainer>

        <ButtonContainer>
          <Link href="/press">
            <PrimeryButton variant="border">Back to Press</PrimeryButton>
          </Link>

          {frontmatter.link && (
            <a href={frontmatter.link} target="_blank" rel="noopener noreferrer">
              <PrimeryButton variant="blue">View Original Article</PrimeryButton>
            </a>
          )}
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default PressDetailScreen;
