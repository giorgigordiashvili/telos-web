'use client';

import React from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';
import PressList from '@/components/PressList';

const Container = styled.div`
  max-width: 1152px;
  margin-inline: auto;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding-block: 96px;
  gap: 96px;

  @media (max-width: 1152px) {
    padding-top: 32px;
    padding-bottom: 48px;
    padding-inline: 16px;
    gap: 48px;
  }
`;

const PressScreen = () => {
  return (
    <Container>
      <PageTitle
        text="Press"
        iconUrl="/images/PageTitle/press.png"
        subtitle="Read the latest Productboard news"
      />
      <PressList />
    </Container>
  );
};

export default PressScreen;
