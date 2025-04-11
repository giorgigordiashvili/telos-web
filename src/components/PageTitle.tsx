import React from "react";
import styled from "styled-components";
import Typography, { H1 } from "./Typography";
import Image from "next/image";

type Props = {
  text: string;
  className?: string;
  iconUrl?: string;
  subtitle?: string;
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StyledTypography = styled(Typography)`
  color: #888888;
`;

const PageTitle = ({ text, className, iconUrl, subtitle }: Props) => {
  return (
    <HeaderWrapper
      className={className}
      style={text === "Blog" ? { alignItems: "flex-start" } : {}}
    >
      {iconUrl && (
        <Image src={iconUrl} alt={`${text} icon`} width={40} height={40} />
      )}
      {subtitle && <StyledTypography variant="h4">{subtitle}</StyledTypography>}
      <H1>{text}</H1>
    </HeaderWrapper>
  );
};

export default PageTitle;
