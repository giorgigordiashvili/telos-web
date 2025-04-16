import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import Image from 'next/image';
import PrimeryButton from './PrimeryButton';

type Props = {
  isMobile?: boolean;
  variant?: 'right' | 'left'; // default: 'right'
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
    gap: 48px;
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
  color: #031716b3;
`;

const PrimeryButtonWrapper = styled.div<{ $variant: 'right' | 'left' }>`
  width: ${({ $variant }) => ($variant === 'left' ? '130px' : '126px')};
  @media (max-width: 1280px) {
    padding-top: 44px;
  }
`;

const NewsCard = ({ isMobile, variant = 'right' }: Props) => {
  const isRight = variant === 'right';

  const title = isRight
    ? 'Exploring the Latest in Tech Trends'
    : 'Building Smarter Digital Solutions';

  const subtitle = isRight
    ? 'Stay ahead of the curve with our insights into emerging technologies and industry innovations. From AI advancements to groundbreaking design tools, we cover what matters most to your business.'
    : 'Discover how our projects push the boundaries of web and mobile development. Learn about the cutting-edge solutions we’ve implemented for our clients.';

  const buttonText = isRight ? 'Read More' : 'Learn More';

  const textSection = (
    <TextContainer>
      <StyledTitle variant={isMobile ? 'h4' : 'h3'}>{title}</StyledTitle>
      <StyledSubtitle variant="paragraph-medium">{subtitle}</StyledSubtitle>
      <PrimeryButtonWrapper $variant={variant}>
        <PrimeryButton variant="border">{buttonText}</PrimeryButton>
      </PrimeryButtonWrapper>
    </TextContainer>
  );

  const imageSection = (
    <ImageContainer>
      <Image
        src="/images/HomePage/NewsPhoto.png"
        alt="NewsPhoto"
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
