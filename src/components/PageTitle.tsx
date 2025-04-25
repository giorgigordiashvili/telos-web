'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import Image from 'next/image';

type Props = {
  text: string;
  className?: string;
  iconUrl?: string;
  subtitle?: string;
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
`;

const StyledTypography = styled(Typography)`
  color: #888888;
`;

export default function PageTitle({ text, className, iconUrl, subtitle }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 1280);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Align content to the start for 'Blog' or 'Acceleration'
  const alignmentStyle =
    text === 'Blog' || text === 'Acceleration' ? { alignItems: 'flex-start' } : {};

  return (
    <HeaderWrapper className={className} style={alignmentStyle}>
      {iconUrl && <Image src={iconUrl} alt={`${text} icon`} width={40} height={40} />}

      {/* If Projects, show 'Work Collection' subtitle */}
      {text === 'Projects' && (
        <StyledTypography variant={isMobile ? 'h3' : 'h4'}>Work Collection</StyledTypography>
      )}

      {/* If not Press and not Projects, show custom subtitle before title */}
      {text !== 'Press' && text !== 'Projects' && subtitle && (
        <StyledTypography variant={isMobile ? 'h3' : 'h4'}>{subtitle}</StyledTypography>
      )}

      <Typography variant={isMobile ? 'h2' : 'h1'}>{text}</Typography>

      {/* If Press, show subtitle after title */}
      {text === 'Press' && subtitle && (
        <StyledTypography variant={isMobile ? 'h4' : 'h3'}>{subtitle}</StyledTypography>
      )}
    </HeaderWrapper>
  );
}
