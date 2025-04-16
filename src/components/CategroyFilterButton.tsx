'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';

type Props = {
  text: string;
  onClick: () => void;
  selected: boolean;
};

const StyledButton = styled.button<{ $selected: boolean }>`
  width: fit-content;
  height: min-content;
  padding: 12px 16px;
  border-radius: 40px;
  background-color: ${({ $selected }) => ($selected ? '#031716' : '#f6f6f6')};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ $selected }) => ($selected ? '#031716' : '#dadada')};
  }
`;

const TextWrapper = styled.div<{ $selected: boolean }>`
  color: ${({ $selected }) => ($selected ? '#fff' : '#031716')};
`;

const CategroyFilterButton = ({ text, onClick, selected }: Props) => {
  return (
    <StyledButton $selected={selected} onClick={onClick}>
      <TextWrapper $selected={selected}>
        <Typography variant="paragraph-medium">{text}</Typography>
      </TextWrapper>
    </StyledButton>
  );
};

export default CategroyFilterButton;
