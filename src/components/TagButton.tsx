'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';

type TagColor = 'brown' | 'green' | 'blue';

type Props = {
  text: string;
  color: TagColor;
};

const colorMap: Record<TagColor, string> = {
  brown: '#BE8484',
  green: '#35B954',
  blue: '#4588C3',
};

const StyledTag = styled.div<{ $color: TagColor }>`
  width: fit-content;
  height: min-content;
  padding: 4px 8px;
  gap: 10px;
  border-radius: 40px;
  background: #ffffff;
  box-shadow: 0px 5px 17.1px -6px #00000033;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: ${({ $color }) => colorMap[$color]};
    text-transform: uppercase;
  }

  @media (max-width: 1280px) {
    p {
      font-size: 14px;
    }
  }
`;

const TagButton = ({ text, color }: Props) => {
  return (
    <StyledTag $color={color}>
      <Typography variant="paragraph-bold">{text}</Typography>
    </StyledTag>
  );
};

export default TagButton;
