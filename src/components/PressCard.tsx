'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

type Props = {
  imageSrc: string;
  title: string;
  subtitle: string;
  date: string;
  slug?: string;
  externalLink?: string;
};

const Wrapper = styled.div`
  width: 270px;
  height: 309px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1152px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 280px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 140px;
  width: 100%;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const Title = styled(Typography)`
  color: #031716;
`;

const Subtitle = styled(Typography)`
  color: #354545;
`;

const DateText = styled(Typography)`
  color: #03171680;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PressCard = ({ imageSrc, title, subtitle, date, slug, externalLink }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const content = (
    <>
      <ImageWrapper>
        <StyledImage
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1152px) 50vw, 25vw"
        />
      </ImageWrapper>
      <Content>
        <Title variant={isMobile ? 'h4' : 'h3'}>{title}</Title>
        <Subtitle variant={isMobile ? 'paragraph-bold' : 'h4'}>{subtitle}</Subtitle>
        <DateText variant="paragraph-bold">{date}</DateText>
      </Content>
    </>
  );

  // If there's an external link, render the card as an anchor tag
  if (externalLink) {
    return (
      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Wrapper>{content}</Wrapper>
      </a>
    );
  }

  // If there's a slug but no external link, link to the internal press detail page
  if (slug) {
    return (
      <Link href={`/press/${slug}`} style={{ textDecoration: 'none' }}>
        <Wrapper>{content}</Wrapper>
      </Link>
    );
  }

  // If there's neither an external link nor a slug, render as is
  return <Wrapper>{content}</Wrapper>;
};

export default PressCard;
