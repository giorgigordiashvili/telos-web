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
        <Logo />
        <Stylednav>
          <MenuItem text="Services" />
          <MenuItem text="Projects" />
          <MenuItem text="Resources">
            <MenuItem text="blog" />
            <MenuItem text="career" />
            <MenuItem text="press" />
          </MenuItem>
          <MenuItem text="Acceleration" />
          <MenuItem text="Order" />
          <MenuItem text="Contact Us" isHighlighted variant="dark" />
        </Stylednav>
        <Burgericon />
      </StyledHeader>
    </Back>
  );
};

export default Header;
