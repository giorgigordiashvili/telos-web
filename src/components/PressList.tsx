"use client";

import React from "react";
import styled from "styled-components";
import PressCard from "./PressCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const Container = styled.div`
  width: 1152px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1152px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const pressData = [
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
  {
    imageSrc: "/images/PressCard/default.png",
    title: "Press Name",
    subtitle: "Article name - headline for article",
    date: "Date (year)",
  },
];

const PressList = () => {
  return (
    <Wrapper>
      <Container>
        {pressData.map((item, index) => (
          <PressCard
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            subtitle={item.subtitle}
            date={item.date}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default PressList;
