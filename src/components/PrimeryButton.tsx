"use client";
import React from "react";
import styled from "styled-components";

type Props = {
  variant: "blue" | "white";
  children: React.ReactNode;
};

const StyledButton = styled.div<{ variant: "blue" | "white" }>`
  width: fit-content;
  height: 53px;
  top: 20px;
  border-radius: 8px;
  padding: 16px 20px;
  font-family: Geist;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  align-content: center;
  background-color: ${({ variant }) =>
    variant === "blue" ? "rgba(30, 95, 255, 0.75)" : "rgba(255, 255, 255, 1)"};
  color: ${({ variant }) => (variant === "blue" ? "#fff" : "#1e5fff")};
  color: ${({ variant }) =>
    variant === "white" ? "rgba(30, 95, 255, 0.7)" : "#fff"};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "blue"
        ? "rgba(75, 123, 243, 0.6)"
        : "rgba(255, 255, 255, 1)"};
    color: ${({ variant }) =>
      variant === "white" ? "rgba(75, 123, 243, 0.6)" : "#fff"};
  }

  &:active {
    background-color: ${({ variant }) =>
      variant === "blue" ? "rgba(30, 95, 255, 1)" : "rgba(255, 255, 255, 1)"};
    color: ${({ variant }) =>
      variant === "white" ? "  rgba(30, 95, 255, 1)" : "#fff"};
  }
`;

const PrimeryButton = ({ children, variant }: Props) => {
  return <StyledButton variant={variant}>{children}</StyledButton>;
};

export default PrimeryButton;
