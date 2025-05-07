'use client';

import MarkdownContent from '@/components/MarkdownContent';
import PrimeryButton from '@/components/PrimeryButton';
import TagButton from '@/components/TagButton';
import Typography from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface BlogDetailScreenProps {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      thumbnail?: string;
      tags?: string[];
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

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
`;

const PublishDate = styled(Typography)`
  color: #666666;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
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

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
`;

// Function to get tag color based on tag name
const getTagColor = (tag: string): 'brown' | 'green' | 'blue' => {
  const lowerTag = tag.toLowerCase();
  if (lowerTag.includes('react') || lowerTag.includes('next.js')) return 'brown';
  if (lowerTag.includes('web') || lowerTag.includes('design')) return 'green';
  return 'blue';
};

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

const BlogDetailScreen: React.FC<BlogDetailScreenProps> = ({ post }) => {
  const { frontmatter, content } = post;
  const formattedDate = formatDate(frontmatter.date);

  return (
    <Container>
      <ContentContainer>
        <Typography variant="h1">{frontmatter.title}</Typography>

        {frontmatter.thumbnail && (
          <HeaderImage>
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </HeaderImage>
        )}

        <BlogMeta>
          <PublishDate variant="paragraph-medium">Published on {formattedDate}</PublishDate>
        </BlogMeta>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <TagsContainer>
            {frontmatter.tags.map(tag => (
              <TagButton key={tag} text={tag} color={getTagColor(tag)} />
            ))}
          </TagsContainer>
        )}

        <MarkdownContainer>
          <MarkdownContent content={content} />
        </MarkdownContainer>

        <NavigationContainer>
          <Link href="/blog">
            <PrimeryButton variant="border">Back to Blog</PrimeryButton>
          </Link>
        </NavigationContainer>
      </ContentContainer>
    </Container>
  );
};

export default BlogDetailScreen;
