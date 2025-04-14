import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  imageUrl: string;
  isCareer?: boolean;
};

const Container = styled.div<{ $isCareer?: boolean }>`
  width: 368px;
  min-height: 250px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 24px;
  background-color: white;
  border: 2px solid #e0e0e0;

  &:hover {
    background-color: #dadada;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    gap: 12px;
    padding: 16px;
    min-height: ${({ $isCareer }) => ($isCareer ? "187px" : "auto")};
  }
`;

const StyledTypography = styled(Typography)`
  color: #031716;
`;

const SubtitleTypography = styled(Typography)`
  color: #03171680;
  white-space: pre-line;
`;

const ServicesCard = ({ title, subtitle, imageUrl, isCareer }: Props) => {
  return (
    <Container $isCareer={isCareer}>
      <Image src={imageUrl} alt={`${title} image`} width={64} height={64} />
      <StyledTypography variant="h4">{title}</StyledTypography>
      <SubtitleTypography variant="paragraph-medium">
        {subtitle}
      </SubtitleTypography>
    </Container>
  );
};

export default ServicesCard;
