import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import Image from 'next/image';
import PrimeryButton from './PrimeryButton';
import Link from 'next/link';

type Props = {
  isMobile?: boolean;
  variant?: 'right' | 'left'; // default: 'right'
  title: string;
  subtitle: string;
  buttonText: string;
  thumbnail?: string; // Optional: URL for the image
  slug?: string; // Optional: for navigation
};

const NewsCardWrapper = styled.div<{ $variant: 'right' | 'left' }>`
  max-width: 956px;
  width: 100%;
  display: grid;
  grid-template-columns: ${({ $variant }) =>
    $variant === 'right' ? '368px 478px' : '478px 368px'};
  justify-content: space-between;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    gap: 110px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 272px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 13px 5px #1e5fff40;
`;

const StyledTitle = styled(Typography)`
  color: #031716;
`;

const StyledSubtitle = styled(Typography)`
  color: #031716;

  @media (max-width: 1280px) {
    font-size: 14px;
  }
`;

const PrimeryButtonWrapper = styled.div<{ $variant: 'right' | 'left' }>`
  width: ${({ $variant }) => ($variant === 'left' ? '130px' : '126px')};
  padding-top: 24px;
  @media (max-width: 1280px) {
    padding-top: 34px;
  }
`;

const NewsCard = ({
  isMobile,
  variant = 'right',
  title,
  subtitle,
  buttonText,
  thumbnail,
  slug,
}: Props) => {
  const isRight = variant === 'right';

  const textSection = (
    <TextContainer>
      <StyledTitle variant={isMobile ? 'h4' : 'h3'}>{title}</StyledTitle>
      <StyledSubtitle variant="paragraph-medium">{subtitle}</StyledSubtitle>
      <PrimeryButtonWrapper $variant={variant}>
        {slug ? (
          <Link href={`/blog/${slug}`} passHref>
            <PrimeryButton variant="border">{buttonText}</PrimeryButton>
          </Link>
        ) : (
          <PrimeryButton variant="border">{buttonText}</PrimeryButton>
        )}
      </PrimeryButtonWrapper>
    </TextContainer>
  );

  const imageSection = (
    <ImageContainer>
      <Image
        src={thumbnail || '/images/HomePage/NewsPhoto.png'}
        alt={title || 'News Photo'}
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </ImageContainer>
  );

  return (
    <NewsCardWrapper $variant={variant}>
      {isRight ? textSection : imageSection}
      {isRight ? imageSection : textSection}
    </NewsCardWrapper>
  );
};

export default NewsCard;
