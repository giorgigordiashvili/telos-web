import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

const Container = styled.div`
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

  @media (max-width: 1184px) {
    max-width: 100%;
    width: 100%;
    gap: 12px;
    padding: 16px;
  }
`;

const StyledTypography = styled(Typography)`
  color: #031716;
`;

const SubtitleTypography = styled(Typography)`
  color: #03171680;
  white-space: pre-line; // ✅ This preserves newlines and spacing
`;

const ServicesCard = ({ title, subtitle, imageUrl }: Props) => {
  return (
    <Container>
      <Image src={imageUrl} alt={`${title} image`} width={64} height={64} />
      <StyledTypography variant="h4">{title}</StyledTypography>
      <SubtitleTypography variant="paragraph-medium">
        {subtitle}
      </SubtitleTypography>
    </Container>
  );
};

export default ServicesCard;
