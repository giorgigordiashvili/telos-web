"use client";
import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import Image from "next/image";
import Typography from "./Typography";

type Props = {};

const Footerstyled = styled.footer`
  width: 100%;
  height: 497px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: 96px 144px;
  align-items: center;
  background: linear-gradient(180deg, #1b2a41 0%, #0f1724 100%);
  @media (max-width: 900px) {
    height: 685px;
    padding: 48px 16px;
    gap: 16px;
  }
`;
const Styledlogo = styled.div`
  margin-left: 86px;
`;
const Footerinfo = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 900px) {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: auto;
    padding: 0;
    justify-content: center;
  }
`;
const Stylednav = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Socials = styled.div`
  display: flex;
  gap: 19px;
  width: 134px;
  position: relative;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(93, 173, 226, 1);
  @media (max-width: 900px) {
    padding-bottom: 8px;
  }
`;
const Footertext = styled.div`
  color: rgba(230, 230, 230, 0.7);
  text-align: left;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media (max-width: 900px) {
    width: fit-content;
    height: 68px;
  }
`;

const Footer = (props: Props) => {
  return (
    <Footerstyled>
      <Styledlogo>
        <Logo color="white"></Logo>
      </Styledlogo>
      <Stylednav>
        <MenuItem text="Services" />
        <MenuItem text="Projects" />
        <MenuItem text="resources">
          <MenuItem text="blog" />
          <MenuItem text="career" />
          <MenuItem text="press" />
        </MenuItem>
        <MenuItem text="Acceleration" />
        <MenuItem text="order" />
      </Stylednav>
      <Socials>
        <Image
          alt="location"
          src={"/images/location.png"}
          width={32}
          height={32}
        />
        <Image
          alt="location"
          src={"/images/location.png"}
          width={32}
          height={32}
        />
        <Image
          alt="location"
          src={"/images/location.png"}
          width={32}
          height={32}
        />
      </Socials>
      <Footerinfo>
        <Location>
          <Image
            alt="location"
            src={"/images/location.png"}
            width={32}
            height={32}
          />
          <Footertext>
            <Typography variant="paragraph-bold" children="Bakhtrioni st. 23" />
            <Typography children="Tbilisi, Georgia" variant="paragraph-bold" />
          </Footertext>
        </Location>
        <Location>
          <Image
            alt="location"
            src={"/images/location.png"}
            width={32}
            height={32}
          />
          <Footertext>
            <Typography variant="paragraph-bold" children="Phone Number" />
            <Typography
              variant="paragraph-bold"
              children="+(995) 999 999 999"
            />
          </Footertext>
        </Location>
        <Location>
          <Image
            alt="location"
            src={"/images/location.png"}
            width={32}
            height={32}
          />
          <Footertext>
            <Typography variant="paragraph-bold" children="Email" />
            <Typography
              variant="paragraph-bold"
              children="example@example.com"
            />
          </Footertext>
        </Location>
      </Footerinfo>
    </Footerstyled>
  );
};

export default Footer;
