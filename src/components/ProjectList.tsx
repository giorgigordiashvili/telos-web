import React, { useMemo } from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';

export interface ProjectItemFrontmatter {
  variant: 'big' | 'small';
  imageSrc: string;
  alt: string;
  siteName: string;
  siteUrl?: string; // Add siteUrl as an optional prop
  order?: number; // Optional: if you have an order field in your CMS
}

export type ProjectItem = {
  slug?: string; // Optional: if you have slugs for project detail pages
  frontmatter: ProjectItemFrontmatter;
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
    // Sort by order if available in frontmatter
    const sortedProjects = [...projects].sort((a, b) => {
      const orderA = a.frontmatter.order || 0;
      const orderB = b.frontmatter.order || 0;
      return orderA - orderB;
    });

    const result: ProjectItem[] = [];
    for (let i = 0; i < sortedProjects.length; i += 2) {
      const row = sortedProjects.slice(i, i + 2);
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
          key={project.slug || index} // Use slug for key if available
          variant={project.frontmatter.variant}
          imageSrc={project.frontmatter.imageSrc}
          alt={project.frontmatter.alt}
          siteName={project.frontmatter.siteName}
          siteUrl={project.frontmatter.siteUrl} // Pass siteUrl to ProjectCard
        />
      ))}
    </CardWrapper>
  );
};

export default ProjectList;
