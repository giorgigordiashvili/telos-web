// src/components/MenuItem.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import DropdownIcon from '@/icons/DropdownIcon';
import Typography from './Typography';

type Props = {
  text: string;
  href?: string;
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
  hasDropdown?: boolean;
  isHighlighted?: boolean;
};

const StyledContainer = styled.li`
  position: relative;
  list-style: none;
  cursor: pointer;
  margin-bottom: 0 !important;
  width: fit-content;
`;

const StyledLink = styled(Link)<{ variant: 'light' | 'dark'; $isHighlighted?: boolean }>`
  padding: 16px 20px;
  border-radius: 8px;
  background-color: ${({ variant, $isHighlighted }) =>
    $isHighlighted ? (variant === 'light' ? '#FFFFFF' : '#1E5FFF') : 'transparent'};
  color: ${({ variant, $isHighlighted }) =>
    variant === 'light'
      ? $isHighlighted
        ? '#628FFF'
        : '#F6F6F6'
      : $isHighlighted
        ? '#FFF'
        : '#6A7473'};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${({ variant, $isHighlighted }) =>
      $isHighlighted ? (variant === 'light' ? '#EDEDED' : '#668DED') : 'transparent'};
    color: ${({ variant, $isHighlighted }) =>
      variant === 'light'
        ? $isHighlighted
          ? '#1E5FFF'
          : '#fff'
        : $isHighlighted
          ? '#FFF'
          : '#000'};
  }

  & svg path {
    stroke: ${({ variant, $isHighlighted }) =>
      variant === 'light'
        ? $isHighlighted
          ? '#628FFF'
          : '#F6F6F6'
        : $isHighlighted
          ? '#FFF'
          : '#6A7473'};
    transition: stroke 0.2s ease;
  }

  &:hover svg path {
    stroke: ${({ variant, $isHighlighted }) =>
      variant === 'light'
        ? $isHighlighted
          ? '#1E5FFF'
          : '#fff'
        : $isHighlighted
          ? '#FFF'
          : '#000'};
  }
`;

const ChildrenContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 12px;
  background-color: white;
  border-radius: 0 20px 20px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 260px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const ChildrenList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export default function MenuItem({
  text,
  href,
  variant = 'dark',
  children,
  hasDropdown = false,
  isHighlighted,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const hasChildrenContent = Boolean(children);
  const showDropdown = hasChildrenContent || hasDropdown;

  const handleToggle = () => {
    if (showDropdown) setIsOpen(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showDropdown && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsOpen(prev => !prev);
    } else if (isOpen && e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  // All items except "Contact Us" use paragraph-medium
  const textVariant =
    text !== 'Contact Us'
      ? 'paragraph-medium'
      : variant === 'dark'
        ? 'paragraph-bold'
        : 'paragraph-medium';

  return (
    <StyledContainer ref={containerRef}>
      <StyledLink
        href={href ?? '#'}
        variant={variant}
        $isHighlighted={isHighlighted}
        onClick={
          showDropdown
            ? e => {
                e.preventDefault();
                handleToggle();
              }
            : undefined
        }
        onKeyDown={handleKeyDown}
        aria-expanded={showDropdown ? isOpen : undefined}
        aria-haspopup={showDropdown ? true : undefined}
        role={showDropdown ? 'button' : undefined}
        tabIndex={0}
      >
        <Typography variant={textVariant}>{text}</Typography>
        {showDropdown && <DropdownIcon aria-hidden="true" />}
      </StyledLink>

      {children && (
        <ChildrenContainer $isOpen={isOpen}>
          <ChildrenList>{children}</ChildrenList>
        </ChildrenContainer>
      )}
    </StyledContainer>
  );
}
