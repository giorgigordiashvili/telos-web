// src/components/ProjectCard.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Typography from './Typography';

type CardVariant = 'big' | 'small';

interface ProjectCardProps {
  variant: CardVariant;
  imageSrc: string;
  alt: string;
  siteName: string;
}

// overlay that changes background-color on hover
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(27, 53, 87, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  pointer-events: none;
`;

// Desktop text hidden by default, visible on hover (desktop only)
const DesktopText = styled(Typography)`
  color: #fff;
  display: none;

  @media (max-width: 1280px) {
    display: none;
  }
`;

// Mobile text hidden by default, visible on hover (mobile only)
const MobileText = styled(Typography)`
  color: #fff;
  display: none;

  @media (max-width: 1280px) {
    /* stays hidden until hover */
  }
`;

const Card = styled.div<{ variant: CardVariant }>`
  position: relative;
  width: 605px;
  height: ${({ variant }) => (variant === 'big' ? '475px' : '378px')};
  overflow: hidden;
  border-radius: 16px;

  @media (max-width: 1280px) {
    width: 100%;
    height: 378px;
  }

  /* show overlay background on hover */
  &:hover ${Overlay} {
    background-color: rgba(27, 53, 87, 0.8);
    pointer-events: auto;
  }

  /* show text on hover */
  &:hover ${DesktopText} {
    display: block;

    @media (max-width: 1280px) {
      display: none;
    }
  }

  &:hover ${MobileText} {
    display: none;

    @media (max-width: 1280px) {
      display: block;
    }
  }
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ variant, imageSrc, alt, siteName }) => (
  <Card variant={variant}>
    <Image src={imageSrc} alt={alt} fill style={{ objectFit: 'cover' }} />
    <Overlay>
      <DesktopText variant="h3">{siteName}</DesktopText>
      <MobileText variant="h4">{siteName}</MobileText>
    </Overlay>
  </Card>
);

export default ProjectCard;
