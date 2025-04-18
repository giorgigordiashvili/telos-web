import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const QuoteWrapper = styled.div`
  width: 303px;
  height: 387px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 120px 24px 24px 24px;
  border-radius: 16px;
  text-align: center;
  background-color: #fff;
  position: relative;

  @media (max-width: 1280px) {
    height: 285px;
    padding: 78px 16px 24px 16px;
    gap: 8px;
  }
`;

const QuoteImage = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 14px 34px 0px #00000033;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1280px) {
    width: 100px;
    height: 100px;
  }
`;

const QuoteText = styled(Typography)`
  color: #03171680;
  flex: 1;

  @media (max-width: 1280px) {
    font-size: 14px;
  }
`;

const QuoteNameCompanyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
`;

const QuoteName = styled(Typography)`
  color: #031716;
`;

const QuoteCompany = styled(Typography)`
  color: #03171680;
`;

type Props = {
  imageSrc: string;
  text: string;
  name: string;
  company: string;
};

const Quote: React.FC<Props> = ({ imageSrc, text, name, company }) => {
  return (
    <QuoteWrapper>
      <QuoteImage>
        <img src={imageSrc} alt={`${name} photo`} />
      </QuoteImage>
      <QuoteText variant="paragraph-medium">{text}</QuoteText>
    <QuoteNameCompanyWrapper>
      <QuoteName variant="h4">{name}</QuoteName>
      <QuoteCompany variant="paragraph-bold">{company}</QuoteCompany>
    </QuoteNameCompanyWrapper>
    </QuoteWrapper>
  );
};

export default Quote;
