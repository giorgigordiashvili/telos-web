"use client";
import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

const StyledHeader = styled.div`
  display: flex;
  padding-inline: 120px;
  justify-content: space-between;
  align-items: center;
`;
const Stylednav = styled.nav`
  display: flex;
  gap: 12px;
`;
type Props = {};

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <Logo></Logo>
      <Stylednav>
        <MenuItem text="Services"></MenuItem>
        <MenuItem text="Projects"></MenuItem>
        <MenuItem text="resources">
          <MenuItem text="blog"></MenuItem>
          <MenuItem text="career"></MenuItem>
          <MenuItem text="press"></MenuItem>
        </MenuItem>
        <MenuItem text="Acceleration"></MenuItem>
        <MenuItem text="order"></MenuItem>
        <MenuItem text="Contact Us" isHighlighted variant="dark"></MenuItem>
      </Stylednav>
    </StyledHeader>
  );
};

export default Header;
