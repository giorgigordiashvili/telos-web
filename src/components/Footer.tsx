'use client';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MenuItem from './MenuItem';
import Image from 'next/image';
import Typography from './Typography';

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
  @media (max-width: 1280px) {
    height: 685px;
    padding: 48px 16px;
    gap: 16px;
  }
`;
const Styledlogo = styled.div`
  margin-left: 86px;
`;
const Footerinfo = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  display: grid;
  grid-template-columns: repeat(3, 368px);
  @media (max-width: 1280px) {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: auto;
    padding: 0;
    justify-content: center;
  }
`;
const Stylednav = styled.div`
  display: flex;
  @media (max-width: 1280px) {
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
  @media (max-width: 1280px) {
    padding-bottom: 8px;
  }
`;
const Footertext = styled.div`
  color: rgba(230, 230, 230, 0.7);
  text-align: left;
`;
const Location = styled.div`
  max-width: 368px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media (max-width: 1280px) {
    width: fit-content;
    height: 68px;
  }
`;

const Footer = () => {
  return (
    <Footerstyled>
      <Styledlogo>
        <Logo color="white" href="/"></Logo>
      </Styledlogo>
      <Stylednav>
        <MenuItem text="Services" href="/services" />
        <MenuItem text="Projects" href="/projects" />
        <MenuItem text="resources">
          <MenuItem text="blog" href="/blog" />
          <MenuItem text="career" href="/career" />
          <MenuItem text="press" href="/press" />
        </MenuItem>
        <MenuItem text="Acceleration" href="/acceleration" />
        <MenuItem text="order" href="/order" />
      </Stylednav>
      <Socials>
        <Image alt="location" src={'/images/Footer/facebook_logo.png'} width={32} height={32} />
        <Image alt="location" src={'/images/Footer/instagram_logo.png'} width={32} height={32} />
        <Image alt="location" src={'/images/Footer/linkedin_logo.png'} width={32} height={32} />
      </Socials>
      <Footerinfo>
        <Location>
          <Image alt="location" src={'/images/Footer/footer_location.png'} width={32} height={32} />
          <Footertext>
            <Typography variant="paragraph-bold">Bakhtrioni st. 23</Typography>
            <Typography variant="paragraph-bold">Tbilisi, Georgia</Typography>
          </Footertext>
        </Location>
        <Location>
          <Image alt="location" src={'/images/Footer/footer_phone.png'} width={32} height={32} />
          <Footertext>
            <Typography variant="paragraph-bold">Phone Number</Typography>
            <Typography variant="paragraph-bold">+(995) 999 999 999</Typography>
          </Footertext>
        </Location>
        <Location>
          <Image alt="location" src={'/images/Footer/footer_email.png'} width={32} height={32} />
          <Footertext>
            <Typography variant="paragraph-bold">Email</Typography>
            <Typography variant="paragraph-bold">example@example.com</Typography>
          </Footertext>
        </Location>
      </Footerinfo>
    </Footerstyled>
  );
};

export default Footer;
