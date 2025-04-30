'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import MenuItem from './MenuItem';
import Burgericon from './Burgericon';

// Styled container that handles background transparency and show/hide on scroll
const Back = styled.div<{ show: boolean; isTop: boolean }>`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ isTop }) => (isTop ? 'transparent' : '#ffffff')};
  display: flex;
  justify-content: center;
  z-index: 100;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  transform: translateY(${({ show }) => (show ? '0' : '-100%')});
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1152px;

  @media (max-width: 1280px) {
    min-width: 100%;
    margin-inline: auto;
    padding-inline: 16px;
  }
`;

const Stylednav = styled.nav`
  display: flex;
  gap: 12px;
  @media (max-width: 1280px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTop(currentScrollY <= 0);
      setShow(currentScrollY < lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Only allow transparency/logo-switch on home
  const effectiveIsTop = isHome && isTop;

  return (
    <Back show={show} isTop={effectiveIsTop}>
      <StyledHeader>
        {/* Logo white on top of home, black otherwise */}
        <Logo href="/" color={effectiveIsTop ? 'white' : 'black'} />
        <Stylednav>
          <MenuItem
            text="Services"
            href="/services"
            variant={effectiveIsTop ? 'light' : 'dark'}
            isTransparent={effectiveIsTop}
          />
          <MenuItem
            text="Projects"
            href="/projects"
            variant={effectiveIsTop ? 'light' : 'dark'}
            isTransparent={effectiveIsTop}
          />
          <MenuItem
            text="Resources"
            hasDropdown
            variant={effectiveIsTop ? 'light' : 'dark'}
            isTransparent={effectiveIsTop}
          >
            <MenuItem
              text="blog"
              href="/blog"
              variant={effectiveIsTop ? 'light' : 'dark'}
              isTransparent={effectiveIsTop}
            />
            <MenuItem
              text="career"
              href="/career"
              variant={effectiveIsTop ? 'light' : 'dark'}
              isTransparent={effectiveIsTop}
            />
            <MenuItem
              text="press"
              href="/press"
              variant={effectiveIsTop ? 'light' : 'dark'}
              isTransparent={effectiveIsTop}
            />
          </MenuItem>
          <MenuItem
            text="Acceleration"
            href="/acceleration"
            variant={effectiveIsTop ? 'light' : 'dark'}
            isTransparent={effectiveIsTop}
          />
          <MenuItem
            text="Order"
            href="/order"
            variant={effectiveIsTop ? 'light' : 'dark'}
            isTransparent={effectiveIsTop}
          />
          {/* Contact Us always dark off-home; light only at top on home */}
          <MenuItem
            text="Contact Us"
            isHighlighted
            variant={effectiveIsTop ? 'light' : 'dark'}
            href="/contact"
          />
        </Stylednav>
        <Burgericon />
      </StyledHeader>
    </Back>
  );
};

export default Header;
