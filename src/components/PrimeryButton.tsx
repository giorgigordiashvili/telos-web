'use client';
import React from 'react';
import styled from 'styled-components';

type Variant = 'blue' | 'white' | 'border';

type Props = {
  type?: 'submit';
  variant: Variant;
  children: React.ReactNode;
};

const StyledButton = styled.button<{ variant: 'blue' | 'white' | 'border' }>`
  width: 100%;
  height: 53px;
  top: 20px;
  border-radius: 8px;
  padding: 16px 20px;
  font-family: Geist;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  align-content: center;
  cursor: pointer;

  background-color: ${({ variant }) =>
    variant === 'blue' ? 'rgba(30, 95, 255, 0.75)' : variant === 'white' ? '#ffffff' : '#EAF4FC'};

  color: ${({ variant }) =>
    variant === 'blue' ? '#ffffff' : variant === 'white' ? 'rgba(30, 95, 255, 0.7)' : '#031716'};

  border: ${({ variant }) => (variant === 'border' ? '1px solid #1E5FFF' : 'none')};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'blue' ? 'rgba(75, 123, 243, 0.6)' : variant === 'white' ? '#ffffff' : '#D6EAFB'};
    color: ${({ variant }) =>
      variant === 'blue' ? '#ffffff' : variant === 'white' ? 'rgba(75, 123, 243, 0.6)' : '#031716'};
  }

  &:active {
    background-color: ${({ variant }) =>
      variant === 'blue' ? 'rgba(30, 95, 255, 1)' : variant === 'white' ? '#ffffff' : '#C0DFF9'};
    color: ${({ variant }) =>
      variant === 'blue' ? '#ffffff' : variant === 'white' ? 'rgba(30, 95, 255, 1)' : '#031716'};
    box-shadow: 0px 7px 13.1px -1px rgba(0, 0, 0, 0.43);
  }
`;

const PrimeryButton = ({ type, children, variant }: Props) => {
  return (
    <StyledButton type={type} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default PrimeryButton;
