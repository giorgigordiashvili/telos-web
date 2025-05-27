'use client';

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';
import PrimeryButton from '@/components/PrimeryButton';
import Image from 'next/image';
import Link from 'next/link';
import BlogList from '@/components/BlogList';

// Interface for Acceleration post data from CMS (similar to BlogPost)
interface AccelerationPost {
  slug: string;
  frontmatter: {
    title: string;
    date?: string; // Optional: if acceleration posts have dates
    thumbnail?: string;
    description?: string; // Keep this for short description
    tags?: string[];
  };
  content: string;
}

// 🔹 useIsMobile hook
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
};

// 🔹 Styled components
const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 96px 16px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  gap: 96px;

  @media (max-width: 768px) {
    padding-top: 32px;
    padding-bottom: 48px;
    gap: 48px;
  }
`;

const BlogContainer = styled.div`
  max-width: 1152px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 96px;
  margin: auto;

  @media (max-width: 768px) {
    gap: 48px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const BlogContent = styled.div`
  max-width: 1152px;
  height: auto;
  display: grid;
  grid-template-columns: 426px 1fr;
  align-items: center;
  gap: 24px;
  border-radius: 32px;
  padding: 12px;
  background-color: #fff;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px 12px;
  }
`;

const BlogTextContainer = styled.div`
  max-width: 456px;
  height: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const BlogImageContainer = styled.div`
  width: 100%;
  height: 426px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const PrimeryButtonWrapper = styled.div`
  width: 114px;
`;

const AccelerationScreen = () => {
  const isMobile = useIsMobile();
  const [featuredPost, setFeaturedPost] = useState<AccelerationPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const response = await fetch('/api/content/acceleration');
        if (!response.ok) throw new Error('Failed to fetch acceleration posts');
        const data = await response.json();

        // Sort posts by date (newest first) or order, and get the first one as featured
        // Adjust sorting as needed for acceleration posts (e.g., by 'order' or 'date')
        if (data.length > 0) {
          const sortedPosts = [...data].sort((a, b) => {
            // Example: sort by order, then by date if order is the same or not present
            const orderA = a.frontmatter.order || 0;
            const orderB = b.frontmatter.order || 0;
            if (orderA !== orderB) return orderA - orderB;
            return (
              new Date(b.frontmatter.date || 0).getTime() -
              new Date(a.frontmatter.date || 0).getTime()
            );
          });
          setFeaturedPost(sortedPosts[0]);
        }
      } catch (error) {
        console.error('Error fetching featured acceleration post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPost();
  }, []);

  return (
    <Container>
      <BlogContainer>
        <HeaderWrapper>
          <PageTitle text="Acceleration" />
          <BlogContent>
            <BlogTextContainer>
              {isLoading ? (
                <Typography variant={isMobile ? 'h4' : 'h2'}>
                  Loading featured article...
                </Typography>
              ) : featuredPost ? (
                <>
                  <Typography variant={isMobile ? 'h4' : 'h2'}>
                    {featuredPost.frontmatter.title}
                  </Typography>
                  <Typography variant="paragraph-medium">
                    {/* Use description from frontmatter or a snippet from content */}
                    {featuredPost.frontmatter.description ||
                      featuredPost.content.substring(0, 150) + '...'}
                  </Typography>
                  <PrimeryButtonWrapper>
                    <Link href={`/acceleration/${featuredPost.slug}`}>
                      <PrimeryButton variant="border">read now</PrimeryButton>
                    </Link>
                  </PrimeryButtonWrapper>
                </>
              ) : (
                <>
                  {/* Fallback content if no featured post is loaded */}
                  <Typography variant={isMobile ? 'h4' : 'h2'}>
                    Explore Our Acceleration Insights
                  </Typography>
                  <Typography variant="paragraph-medium">
                    Discover strategies and resources to accelerate your growth.
                  </Typography>
                </>
              )}
            </BlogTextContainer>
            <BlogImageContainer>
              <Image
                src={featuredPost?.frontmatter.thumbnail || '/images/Blog/test.png'} // Fallback image
                alt={featuredPost?.frontmatter.title || 'Featured acceleration article'}
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
              />
            </BlogImageContainer>
          </BlogContent>
        </HeaderWrapper>
        <BlogList collectionName="acceleration" />
      </BlogContainer>
    </Container>
  );
};

export default AccelerationScreen;
