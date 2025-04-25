'use client';

import PageTitle from '@/components/PageTitle';
import ServicesList from '@/components/ServicesList';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1152px;
  margin: auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding-block: 96px;
  gap: 96px;

  @media (max-width: 1280px) {
    padding: 32px 16px 48px 16px;
    gap: 48px;
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

const ServicesScreen = () => {
  return (
    <ContainerWrapper>
      <Container>
        <PageTitle text="Our Services" iconUrl="/images/PageTitle/services.png" />
        <ServicesList text="Software" />
        <ServicesList text="Marketing" />
      </Container>
    </ContainerWrapper>
  );
};

export default ServicesScreen;
