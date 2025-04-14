import React from "react";
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
`;

const Title = styled(Typography)`
  color: #031716;
`;

const Subtitle = styled(Typography)`
  color: #354545;
`;

const DateText = styled(Typography)`
  color: #03171680;
  margin-top: auto;
`;

const PressCard = ({ imageSrc, title, subtitle, date }: Props) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImage src={imageSrc} alt={title} fill priority />
      </ImageWrapper>
      <Content>
        <Title variant="h3">{title}</Title>
        <Subtitle variant="h4">{subtitle}</Subtitle>
        <DateText variant="paragraph-bold">{date}</DateText>
      </Content>
    </Wrapper>
  );
};

export default PressCard;
