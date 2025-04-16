'use client';
import DropdownIcon from '@/icons/DropdownIcon';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const StyledContainer = styled.li`
  position: relative;
  list-style: none;

  cursor: pointer;
  margin-bottom: 0px !important;
  width: fit-content;
`;

const StyledLink = styled.a<{
  variant: 'light' | 'dark';
  isHighlighted?: boolean;
}>`
  padding: 16px 20px;
  border-radius: 8px;
  background-color: ${({ variant, isHighlighted }) =>
    isHighlighted ? (variant === 'light' ? '#FFFFFF' : '#1E5FFF') : 'transparent'};
  color: ${({ variant, isHighlighted }) =>
    variant === 'light'
      ? isHighlighted
        ? '#628FFF'
        : '#F6F6F6'
      : isHighlighted
        ? '#FFF'
        : '#6A7473'};
  &:hover {
    background-color: ${({ variant, isHighlighted }) =>
      isHighlighted ? (variant === 'light' ? '#EDEDED' : '#668DED') : 'transparent'};
    color: ${({ variant, isHighlighted }) =>
      variant === 'light' ? (isHighlighted ? '#1E5FFF' : '#fff') : isHighlighted ? '#FFF' : '#000'};
  }
  display: flex;
  align-items: center;
  gap: 4px;

  /* For targeting dropdown icon */
  & svg path {
    stroke: ${({ variant, isHighlighted }) =>
      variant === 'light'
        ? isHighlighted
          ? '#628FFF'
          : '#F6F6F6'
        : isHighlighted
          ? '#FFF'
          : '#6A7473'};
    transition: stroke 0.2s ease;
  }

  &:hover svg path {
    stroke: ${({ variant, isHighlighted }) =>
      variant === 'light' ? (isHighlighted ? '#1E5FFF' : '#fff') : isHighlighted ? '#FFF' : '#000'};
  }
`;

const ChildrenContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 12px;
  background-color: white;
  border-radius: 0 20px 20px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 260px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

type Props = {
  text: string;
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
  hasDropdown?: boolean;
  isHighlighted?: boolean;
};

function MenuItem({ text, variant = 'dark', children, hasDropdown = false, isHighlighted }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const hasChildrenContent = Boolean(children);
  const showDropdown = hasChildrenContent || hasDropdown;

  const handleToggle = () => {
    if (showDropdown) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (showDropdown && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (isOpen && event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <StyledContainer ref={containerRef}>
      <StyledLink
        isHighlighted={isHighlighted}
        variant={variant}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup={showDropdown ? 'true' : undefined}
        role={showDropdown ? 'button' : undefined}
        tabIndex={0}
      >
        <Typography variant="paragraph-medium">{text}</Typography>
        {showDropdown && <DropdownIcon aria-hidden="true" />}
      </StyledLink>
      {children && <ChildrenContainer isOpen={isOpen}>{children}</ChildrenContainer>}
    </StyledContainer>
  );
}

export default MenuItem;
