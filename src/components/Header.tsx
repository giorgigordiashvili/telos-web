"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import Burgericon from "./Burgericon";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1152px;
  margin-inline: auto;
  @media (max-width: 900px) {
    margin-inline: 16px;
  }
`;

const Stylednav = styled.nav`
  display: flex;
  gap: 12px;
  @media (max-width: 900px) {
    display: none;
  }
`;

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <StyledHeader>
        <Logo />
        <Stylednav>
          <MenuItem text="Services" />
          <MenuItem text="Projects" />
          <MenuItem text="resources">
            <MenuItem text="blog" />
            <MenuItem text="career" />
            <MenuItem text="press" />
          </MenuItem>
          <MenuItem text="Acceleration" />
          <MenuItem text="order" />
          <MenuItem text="Contact Us" isHighlighted variant="dark" />
        </Stylednav>
        <Burgericon />
      </StyledHeader>
    </>
  );
};

export default Header;
