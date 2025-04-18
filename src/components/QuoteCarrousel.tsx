'use client';

import React from 'react';
import styled from 'styled-components';
import Quote from './Quote';

type QuoteItem = {
  imageSrc: string;
  text: string;
  name: string;
  company: string;
};

const quotesData: QuoteItem[] = [
  {
    imageSrc: '/images/Quote/CustomerPhoto-1.png',
    text: `“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. The social proof section is important when you want to increase trust and trustworthiness of your company with your website visitors.”`,
    name: 'John Doe',
    company: 'CEO @ Acme Corp',
  },
  {
    imageSrc: '/images/Quote/CustomerPhoto-2.png',
    text: `“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. The social proof section is important when you want to increase trust and trustworthiness of your company with your website visitors.”`,
    name: 'Jane Smith',
    company: 'CTO @ BetaTech',
  },
  {
    imageSrc: '/images/Quote/CustomerPhoto-3.png',
    text: `“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. The social proof section is important when you want to increase trust and trustworthiness of your company with your website visitors.”`,
    name: 'Alice Johnson',
    company: 'Marketing Manager @ Gamma LLC',
  },
  {
    imageSrc: '/images/Quote/CustomerPhoto-4.png',
    text: `“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. The social proof section is important when you want to increase trust and trustworthiness of your company with your website visitors.”`,
    name: 'Bob Brown',
    company: 'Lead Developer @ DeltaWorks',
  },
  {
    imageSrc: '/images/Quote/CustomerPhoto-5.png',
    text: `“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. The social proof section is important when you want to increase trust and trustworthiness of your company with your website visitors.”`,
    name: 'Emily Davis',
    company: 'Product Designer @ Epsilon Inc',
  },
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f7f9fc;

  @media (max-width: 1280px) {
    padding: 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1152px;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FadeLeft = styled.div`
  position: absolute;
  top: 0;
  left: -2px;
  width: 98px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(90deg, #f7f9fc 0%, rgba(247, 249, 252, 0) 100%);
  z-index: 1;

  @media (max-width: 1280px) {
    width: 44px;
    height: 315px;
  }
`;

const FadeRight = styled(FadeLeft)`
  left: auto;
  right: -2px;
  background: linear-gradient(270deg, #f7f9fc 0%, rgba(247, 249, 252, 0) 100%);
`;

const Slide = styled.div`
  flex: none;
  scroll-snap-align: start;
`;

const QuoteOuter = styled.div`
  display: flex;
  align-items: flex-end;
  height: 417px;

  @media (max-width: 1280px) {
    height: 315px;
  }
`;

const QuoteCarousel: React.FC = () => (
  <Wrapper>
    <CarouselContainer>
      <FadeLeft />
      <FadeRight />

      <ScrollArea>
        {quotesData.map((q, idx) => (
          <Slide key={idx}>
            <QuoteOuter>
              <Quote imageSrc={q.imageSrc} text={q.text} name={q.name} company={q.company} />
            </QuoteOuter>
          </Slide>
        ))}
      </ScrollArea>
    </CarouselContainer>
  </Wrapper>
);

export default QuoteCarousel;
