'use client';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MenuItem from './MenuItem';

const Back = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 214px;
  background-color: rgba(3, 23, 22, 1);
  height: 100%;
  padding: 11px 17px 26px 0;
`;

const Wrapper = styled.div`
  align-self: flex-end;
  cursor: pointer;
`;

const Stylednav = styled.nav`
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  padding-top: 42px;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  margin-top: auto;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LocationP = styled.div`
  font-family: Geist;
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -2%;
  color: rgba(255, 255, 255, 0.7);
  margin-top: auto;
`;

type Props = {
  onClose: () => void;
};

const SideBar = ({ onClose }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Back>
      <Box ref={boxRef}>
        <Wrapper onClick={onClose}>
          <Image alt="X" width={17} height={14} src="/images/cancel.png" />
        </Wrapper>
        <Stylednav>
          <MenuItem text="Services" variant="light" />
          <MenuItem text="Projects" variant="light" />
          <MenuItem text="Acceleration" variant="light" />
          <MenuItem text="resources" variant="light">
            <MenuItem text="blog" />
            <MenuItem text="career" />
            <MenuItem text="press" />
          </MenuItem>
        </Stylednav>
        <Contact>
          <MenuItem text="Contact Us" isHighlighted variant="light" />
          <Location>
            <Image alt="location" width={11} height={17} src="/images/location.png" />
            <LocationP> Bakhtrioni st. 23</LocationP>
          </Location>
        </Contact>
      </Box>
    </Back>
  );
};

export default SideBar;
