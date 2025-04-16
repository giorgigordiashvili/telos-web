'use client';

import React from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';
import ServicesList from '@/components/ServicesList';

const Container = styled.div`
  max-width: 1152px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding: 96px 16px;
  gap: 48px;

  @media (max-width: 768px) {
    padding-top: 32px;
    padding-bottom: 48px;
    gap: 24px;
  }
`;

const CareerScreen = () => {
  return (
    <Container>
      <PageTitle text="Career" />
      <ServicesList text="Career" />
    </Container>
  );
};

export default CareerScreen;
