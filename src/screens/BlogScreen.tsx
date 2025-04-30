'use client';

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';
import PrimeryButton from '@/components/PrimeryButton';
import Image from 'next/image';
import BlogList from '@/components/BlogList';

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
  margin-top: 60px;
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
  grid-template-columns: 456px 1fr;
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

const BlogScreen = () => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <BlogContainer>
        <HeaderWrapper>
          <PageTitle text="Blog" />
          <BlogContent>
            <BlogTextContainer>
              <Typography variant={isMobile ? 'h4' : 'h2'}>
                this is a featured article - the most important piece of content
              </Typography>
              <Typography variant="paragraph-medium">
                very short description of whats actually being discussed in this article, maybe the
                first sentences to provide a preview
              </Typography>
              <PrimeryButtonWrapper>
                <PrimeryButton variant="border">read now</PrimeryButton>
              </PrimeryButtonWrapper>
            </BlogTextContainer>
            <BlogImageContainer>
              <Image
                src="/images/Blog/test.png"
                alt="test-photo"
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
              />
            </BlogImageContainer>
          </BlogContent>
        </HeaderWrapper>
        <BlogList />
      </BlogContainer>
    </Container>
  );
};

export default BlogScreen;
