import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "./Typography";
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
  text-align: center;
  gap: 16px;
`;

const StyledTypography = styled(Typography)`
  color: #888888;
`;

const PageTitle = ({ text, className, iconUrl, subtitle }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 1184);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <HeaderWrapper
      className={className}
      style={text === "Blog" ? { alignItems: "flex-start" } : {}}
    >
      {iconUrl && (
        <Image src={iconUrl} alt={`${text} icon`} width={40} height={40} />
      )}
      {subtitle && (
        <StyledTypography variant={isMobile ? "paragraph-bold" : "h4"}>
          {subtitle}
        </StyledTypography>
      )}
      <Typography variant={isMobile ? "h2" : "h1"}>{text}</Typography>
    </HeaderWrapper>
  );
};

export default PageTitle;
