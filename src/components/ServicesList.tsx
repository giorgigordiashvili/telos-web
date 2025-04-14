"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "./Typography";
import ServicesCard from "./ServicesCard";

type Props = {
  text: "Software" | "Marketing" | "Career";
};

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
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Heading = styled(Typography)<{ $center?: boolean }>`
  align-self: ${({ $center }) => ($center ? "center" : "flex-start")};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
`;

const softwareServices = [
  {
    imageUrl: "/images/ServicesCard/backend.png",
    title: "Backend Development",
    subtitle: `· Develop secure, scalable, and high-performance backend systems using Node.js, Laravel, and other modern technologies.\n\n· Create RESTful APIs and GraphQL endpoints for seamless data communication.\n\n· Handle server-side logic, database architecture, and cloud integration.`,
  },
  {
    imageUrl: "/images/ServicesCard/frontend.png",
    title: "Frontend Development",
    subtitle: `· Build responsive and interactive web interfaces using React.js and Next.js.\n\n· Implement dynamic features, animations, and intuitive user flows.\n\n· Ensure cross-browser compatibility and SEO optimization.`,
  },
  {
    imageUrl: "/images/ServicesCard/mobile.png",
    title: "Mobile Development",
    subtitle: `· Develop cross-platform mobile applications with React Native.· Create native-like performance and seamless UX for Android and iOS.· Integrate APIs, payment gateways, and real-time notifications.`,
  },
];

const marketingService = {
  imageUrl: "/images/ServicesCard/design.png",
  title: "Design",
  subtitle: `· Create visually stunning UI/UX designs tailored to your brand identity.\n\n· Develop prototypes and wireframes for rapid validation of ideas.\n\n· Deliver design systems and reusable components.`,
};

const careerServices = [
  {
    imageUrl: "/images/ServicesCard/default_service_icon.png",
    title: "Knowledge Sharing",
    subtitle: "type description here, what this services offers cliend",
  },
  {
    imageUrl: "/images/ServicesCard/default_service_icon.png",
    title: "Personal Growth",
    subtitle: "type description here, what this services offers cliend",
  },
  {
    imageUrl: "/images/ServicesCard/default_service_icon.png",
    title: "Events & Occasions",
    subtitle: "type description here, what this services offers cliend",
  },
  {
    imageUrl: "/images/ServicesCard/default_service_icon.png",
    title: "Ambassador Program",
    subtitle: "type description here, what this services offers cliend",
  },
  {
    imageUrl: "/images/ServicesCard/default_service_icon.png",
    title: "Relocation Opportunities",
    subtitle: "type description here, what this services offers cliend",
  },
  {
    imageUrl: "/images/ServicesCard/default_service_icon.png",
    title: "Internal Activities",
    subtitle: "type description here, what this services offers cliend",
  },
];

const ServicesList = ({ text }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Wrapper>
      <Heading
        variant={text === "Career" ? (isMobile ? "h3" : "h2") : isMobile ? "h3" : "h1"}
        $center={text === "Career"}
      >
        {text === "Career" ? "Company Benefits" : text}
      </Heading>

      {text === "Software" ? (
        <Container>
          {softwareServices.map((service, index) => (
            <ServicesCard
              key={index}
              imageUrl={service.imageUrl}
              title={service.title}
              subtitle={service.subtitle}
            />
          ))}
        </Container>
      ) : text === "Marketing" ? (
        <ServicesCard
          imageUrl={marketingService.imageUrl}
          title={marketingService.title}
          subtitle={marketingService.subtitle}
        />
      ) : (
        <Container>
          {careerServices.map((service, index) => (
            <ServicesCard
              key={index}
              imageUrl={service.imageUrl}
              title={service.title}
              subtitle={service.subtitle}
              isCareer
            />
          ))}
        </Container>
      )}
    </Wrapper>
  );
};

export default ServicesList;
