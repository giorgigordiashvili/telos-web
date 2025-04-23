import React, { useMemo } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';

export type ProjectItem = {
  variant: 'big' | 'small';
  imageSrc: string;
  alt: string;
  siteName: string;
};

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: center;
  gap: 0 48px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    gap: 24px 0;
    padding-inline: 16px;
  }
`;

interface ProjectListProps {
  projects: ProjectItem[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const orderedProjects = useMemo(() => {
    const result: ProjectItem[] = [];
    for (let i = 0; i < projects.length; i += 2) {
      const row = projects.slice(i, i + 2);
      const rowIndex = i / 2 + 1;
      if (rowIndex % 2 === 0) row.reverse();
      result.push(...row);
    }
    return result;
  }, [projects]);

  return (
    <CardWrapper>
      {orderedProjects.map((project, index) => (
        <ProjectCard
          key={index}
          variant={project.variant}
          imageSrc={project.imageSrc}
          alt={project.alt}
          siteName={project.siteName}
        />
      ))}
    </CardWrapper>
  );
};

export default ProjectList;
