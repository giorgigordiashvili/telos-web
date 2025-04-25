'use client';

import PageTitle from '@/components/PageTitle';
import React from 'react';
import styled from 'styled-components';
import ProjectList, { ProjectItem } from '@/components/ProjectList';

const allProjects: ProjectItem[] = [
  {
    variant: 'big',
    imageSrc: '/images/PressCard/default.png',
    alt: 'Project 1',
    siteName: 'Press Showcase',
  },
  {
    variant: 'small',
    imageSrc: '/images/Blog/test.png',
    alt: 'Project 2',
    siteName: 'Tech Blog',
  },
  {
    variant: 'big',
    imageSrc: '/images/PressCard/default.png',
    alt: 'Project 3',
    siteName: 'Press Showcase',
  },
  {
    variant: 'small',
    imageSrc: '/images/Blog/test.png',
    alt: 'Project 4',
    siteName: 'Tech Blog',
  },
  {
    variant: 'big',
    imageSrc: '/images/PressCard/default.png',
    alt: 'Project 5',
    siteName: 'Press Showcase',
  },
  {
    variant: 'small',
    imageSrc: '/images/Blog/test.png',
    alt: 'Project 6',
    siteName: 'Tech Blog',
  },
  {
    variant: 'big',
    imageSrc: '/images/PressCard/default.png',
    alt: 'Project 7',
    siteName: 'Press Showcase',
  },
  {
    variant: 'small',
    imageSrc: '/images/Blog/test.png',
    alt: 'Project 8',
    siteName: 'Tech Blog',
  },
];

const Container = styled.div`
  margin: auto;
  margin-top: 60px;
  padding-block: 96px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 1280px) {
    padding-block: 48px;
    gap: 24px;
  }
`;

const ProjectsScreen: React.FC = () => (
  <Container>
    <PageTitle text="Projects" />
    <ProjectList projects={allProjects} />
  </Container>
);

export default ProjectsScreen;
