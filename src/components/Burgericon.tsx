'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import BurgerMenuIcon from '@/icons/BurgerMenuIcon';
import SideBar from './SideBar';

type Props = {
  color?: string;
};

const IconWrapper = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  display: none;

  @media (max-width: 1280px) {
    display: block;
  }
`;

const Burgericon: React.FC<Props> = ({ color = '#000000' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <IconWrapper onClick={toggleSidebar} aria-label="Toggle menu">
        <BurgerMenuIcon color={color} />
      </IconWrapper>
      {isOpen && <SideBar onClose={closeSidebar} />}
    </>
  );
};

export default Burgericon;
