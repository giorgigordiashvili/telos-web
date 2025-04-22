'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const CheckboxWrapper = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: Geist;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  color: #0f241f;
  opacity: ${({ $checked }) => ($checked ? 1 : 0.6)};
  &:hover {
    opacity: 1;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div<{ $checked: boolean; $hovered: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ $checked }) => ($checked ? 'none' : '#1d2e2b')};
  background-color: ${({ $checked }) => ($checked ? 'rgba(53, 185, 84, 1)' : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $checked }) =>
    $checked
      ? `-1px -3px 5px rgba(0,0,0,0.25) inset,
         3px 4px 5.4px rgba(255,255,255,0.25) inset`
      : 'none'};
`;

const Checkmark = styled.div`
  width: 14px;
  height: 14px;
  background: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12L10 18L20 6' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    center center no-repeat;
  background-size: contain;
`;

type Props = {
  label?: string;
  checked: boolean;
  onChange: () => void;
};

export default function PrimeryCheckbox({ label, checked, onChange }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <CheckboxWrapper
      $checked={checked}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox $checked={checked} $hovered={hovered}>
        {checked && <Checkmark />}
      </StyledCheckbox>
      <Typography variant="paragraph-medium">{label}</Typography>
    </CheckboxWrapper>
  );
}
