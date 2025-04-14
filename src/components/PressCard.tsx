"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "./Typography";
import Image from "next/image";

type Props = {
  imageSrc: string;
  title: string;
  subtitle: string;
  date: string;
};

const Wrapper = styled.div`
  width: 270px;
  height: 309px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;

  @media (max-width: 1152px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 280px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 140px;
  width: 100%;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const Title = styled(Typography)`
  color: #031716;
`;

const Subtitle = styled(Typography)`
  color: #354545;
`;

const DateText = styled(Typography)`
  color: #03171680;
`;

const PressCard = ({ imageSrc, title, subtitle, date }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImage
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1152px) 50vw, 25vw"
        />
      </ImageWrapper>
      <Content>
        <Title variant={isMobile ? "h3" : "h3"}>{title}</Title>
        <Subtitle variant={isMobile ? "paragraph-bold" : "h4"}>
          {subtitle}
        </Subtitle>
        <DateText variant="paragraph-bold">{date}</DateText>
      </Content>
    </Wrapper>
  );
};

export default PressCard;
