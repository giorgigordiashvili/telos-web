'use client';
import styled from 'styled-components';
import Logo from './Logo';
import MenuItem from './MenuItem';
import Burgericon from './Burgericon';
const Back = styled.div`
  width: 100%;
  height: fit-content;
  position: fixed;
  background-color: white;
  display: flex;
  justify-content: center;
  justify-self: anchor-center;
  z-index: 100;
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

const Header = () => {
  return (
    <Back>
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
    </Back>
  );
};

export default Header;
