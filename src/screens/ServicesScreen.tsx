"use client";

import PageTitle from "@/components/PageTitle";
import ServicesList from "@/components/ServicesList";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1152px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding: 96px 16px;
  gap: 96px;

  @media (max-width: 1184px) {
    padding-top: 32px;
    padding-bottom: 48px;
    gap: 48px;
  }
`;

const ServicesScreen = () => {
  return (
    <Container>
      <PageTitle text="Our Services" iconUrl="/images/PageTitle/services.png" />
      <ServicesList text="Software" />
      <ServicesList text="Marketing" />
    </Container>
  );
};

export default ServicesScreen;
