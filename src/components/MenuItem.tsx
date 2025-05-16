'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import DropdownIcon from '@/icons/DropdownIcon';
import Typography from './Typography';

type Props = {
  text: string;
  href?: string;
  variant?: 'light' | 'dark' | 'sidebar';
  children?: React.ReactNode;
  hasDropdown?: boolean;
  isHighlighted?: boolean;
  isTransparent?: boolean;
  onClick?: () => void;
};

const StyledContainer = styled.li`
  position: relative;
  list-style: none;
  cursor: pointer;
  margin-bottom: 0 !important;
  width: fit-content;
`;

const StyledLink = styled(Link)<{
  variant: 'light' | 'dark' | 'sidebar';
  $isHighlighted?: boolean;
  $isTransparent?: boolean;
}>`
  padding: 16px 20px;
  border-radius: 8px;
  background-color: ${({ variant, $isHighlighted }) =>
    variant === 'sidebar'
      ? 'transparent'
      : $isHighlighted
        ? variant === 'light'
          ? '#FFFFFF'
          : '#1E5FFF'
        : 'transparent'};
  color: ${({ variant, $isHighlighted, $isTransparent }) =>
    variant === 'sidebar'
      ? '#F6F6F6'
      : variant === 'light'
        ? $isTransparent
          ? '#CCCCCC'
          : $isHighlighted
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
      variant === 'sidebar'
        ? 'transparent'
        : $isHighlighted
          ? variant === 'light'
            ? '#EDEDED'
            : '#668DED'
          : 'transparent'};
    color: ${({ variant, $isHighlighted }) =>
      variant === 'sidebar'
        ? '#F6F6F6'
        : variant === 'light'
          ? $isHighlighted
            ? '#1E5FFF'
            : '#fff'
          : $isHighlighted
            ? '#FFF'
            : '#000'};
  }

  & svg path {
    stroke: ${({ variant, $isHighlighted, $isTransparent }) =>
      variant === 'sidebar'
        ? '#F6F6F6'
        : variant === 'light'
          ? $isTransparent
            ? '#CCCCCC'
            : $isHighlighted
              ? '#628FFF'
              : '#F6F6F6'
          : $isHighlighted
            ? '#FFF'
            : '#6A7473'};
    transition: stroke 0.2s ease;
  }

  &:hover svg path {
    stroke: ${({ variant, $isHighlighted }) =>
      variant === 'sidebar'
        ? '#F6F6F6'
        : variant === 'light'
          ? $isHighlighted
            ? '#1E5FFF'
            : '#fff'
          : $isHighlighted
            ? '#FFF'
            : '#000'};
  }
`;

const ChildrenContainer = styled.div<{ $isOpen: boolean; $isSidebar?: boolean }>`
  position: absolute;
  top: 100%;
  left: ${({ $isSidebar }) => ($isSidebar ? '-33px' : '0')};
  padding: 12px;
  background-color: white;
  border-radius: ${({ $isSidebar }) => ($isSidebar ? '0' : '0 20px 20px 20px')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: ${({ $isSidebar }) => ($isSidebar ? '214px' : '260px')};
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};

  /* Override text color for dropdown items */
  .dropdown-children a {
    color: #6a7473 !important;
  }

  /* Override hover color for dropdown items */
  .dropdown-children a:hover {
    color: #000 !important;
  }
`;

const ChildrenList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ChildMenuItemWrapper = styled.div`
  /* Always use dark color for items in dropdowns regardless of parent's variant */
  & > li > a {
    color: #6a7473 !important;
  }

  & > li > a:hover {
    color: #000 !important;
  }

  /* Ensure pointer events work correctly */
  & > li {
    cursor: pointer;
  }
`;

export default function MenuItem({
  text,
  href,
  variant = 'dark',
  children,
  hasDropdown = false,
  isHighlighted,
  isTransparent = false,
  onClick,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const hasChildrenContent = Boolean(children);
  const showDropdown = hasChildrenContent || hasDropdown;

  const handleToggle = () => {
    if (showDropdown) setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    // If this MenuItem has an onClick prop, call it when closing the dropdown
    // This will propagate to the SideBar's onClose function
    if (onClick) onClick();
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

  const textVariant = text === 'Contact Us' ? 'paragraph-bold' : 'paragraph-medium';

  return (
    <StyledContainer ref={containerRef}>
      <StyledLink
        href={href ?? '#'}
        variant={variant}
        $isHighlighted={isHighlighted}
        $isTransparent={isTransparent}
        onClick={
          showDropdown
            ? e => {
                e.preventDefault();
                handleToggle();
                if (onClick) onClick();
              }
            : onClick
        }
        onKeyDown={handleKeyDown}
        aria-expanded={showDropdown ? isOpen : undefined}
        aria-haspopup={showDropdown ? true : undefined}
        role={showDropdown ? 'button' : undefined}
        tabIndex={0}
      >
        <Typography variant={textVariant}>{text}</Typography>
        {showDropdown && (
          <DropdownIcon aria-hidden="true" color={variant === 'sidebar' ? '#F6F6F6' : undefined} />
        )}
      </StyledLink>

      {children && (
        <ChildrenContainer
          $isOpen={isOpen}
          $isSidebar={variant === 'sidebar'}
          onClick={closeDropdown}
        >
          <ChildrenList>
            <ChildMenuItemWrapper>{children}</ChildMenuItemWrapper>
          </ChildrenList>
        </ChildrenContainer>
      )}
    </StyledContainer>
  );
}
