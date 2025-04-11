import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import ServicesCard from "./ServicesCard";

type Props = {
  text: "Software" | "Marketing";
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
  justify-content: space-between;
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
    subtitle: `· Develop cross-platform mobile applications with React Native.\n\n· Create native-like performance and seamless UX for Android and iOS.\n\n· Integrate APIs, payment gateways, and real-time notifications.`,
  },
];

const marketingService = {
  imageUrl: "/images/ServicesCard/design.png",
  title: "Design",
  subtitle: `· Create visually stunning UI/UX designs tailored to your brand identity.\n\n· Develop prototypes and wireframes for rapid validation of ideas.\n\n· Deliver design systems and reusable components.`,
};

const ServicesList = ({ text }: Props) => {
  return (
    <Wrapper>
      <Typography variant="h1">{text}</Typography>
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
      ) : (
        <ServicesCard
          imageUrl={marketingService.imageUrl}
          title={marketingService.title}
          subtitle={marketingService.subtitle}
        />
      )}
    </Wrapper>
  );
};

export default ServicesList;
