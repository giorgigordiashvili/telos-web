'use client';

import React from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';
import ServicesList from '@/components/ServicesList';

const Container = styled.div`
  max-width: 1152px;
  margin: auto;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: normal;
  padding-block: 96px;
  gap: 48px;

  @media (max-width: 768px) {
    padding-top: 32px;
    padding-bottom: 48px;
    gap: 24px;
    padding-inline: 16px;
  }
`;

const ContainerWrapper = styled.div`
  margin-top: 60px;
  background-image: url('/images/order/back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const CareerScreen = () => {
  return (
    <ContainerWrapper>
      <Container>
        <PageTitle text="Career" />
        <ServicesList text="Career" />
      </Container>
    </ContainerWrapper>
  );
};

export default CareerScreen;
