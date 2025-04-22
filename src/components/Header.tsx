'use client';
import styled from 'styled-components';
import Logo from './Logo';
import MenuItem from './MenuItem';
import Burgericon from './Burgericon';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1152px;
  margin-inline: auto;
  @media (max-width: 1280px) {
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

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Logo href="/" />
        <Stylednav>
          <MenuItem text="Services" href="/services" />
          <MenuItem text="Projects" href="/projects" />
          <MenuItem text="Resources">
            <MenuItem text="blog" href="/blog" />
            <MenuItem text="career" href="/career" />
            <MenuItem text="press" href="/press" />
          </MenuItem>
          <MenuItem text="Acceleration" href="/acceleration" />
          <MenuItem text="Order" href="/order" />
          <MenuItem text="Contact Us" isHighlighted variant="dark" href="/contact" />
        </Stylednav>
        <Burgericon />
      </StyledHeader>
    </>
  );
};

export default Header;
