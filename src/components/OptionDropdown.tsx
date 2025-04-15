"use client";

import React, { useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import Typography from "./Typography";

const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
`;

const DropdownHeader = styled.div<{ isOpen: boolean }>`
  background-color: rgba(248, 248, 248, 1);
  padding: 14px 20px 14px 24px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(3, 23, 22, 0.4);

  ${(props) =>
    props.isOpen &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: unset;
    `}
`;

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  transition: transform 0.2s ease-in-out;
  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const DropdownList = styled.ul`
  list-style: none;
  background-color: rgba(248, 248, 248, 1);
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-top: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: absolute;
  width: 100%;
  max-height: 215px;
  overflow-y: auto;
  left: 0;
  direction: rtl;
  text-align: left;
  top: 47px;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 3px;
    height: 42px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 1);
  }
`;

const DropdownItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  color: rgba(3, 23, 22, 1);

  &:hover {
    background-color: #f1f1f1;
  }
`;

interface SelecDropdownProps {
  options: string[];
  value?: string | null;
  onChange?: (value: string) => void;
}

const SelecDropdown: React.FC<SelecDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value ?? null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <DropdownContainer>
      <DropdownHeader isOpen={isOpen} onClick={toggleDropdown}>
        <Typography variant="paragraph-medium">
          {selected || "Select an option"}
        </Typography>
        <ArrowWrapper isOpen={isOpen}>
          <Image
            src="/images/order/down.png"
            alt="arrow"
            width={11}
            height={5.5}
          />
        </ArrowWrapper>
      </DropdownHeader>

      {isOpen && (
        <DropdownList>
          {options.map((option, idx) => (
            <DropdownItem key={idx} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default SelecDropdown;
