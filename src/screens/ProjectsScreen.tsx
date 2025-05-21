'use client';

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectList, { ProjectItem } from '@/components/ProjectList';
import Typography from '@/components/Typography';

const StatusTypography = styled(Typography)`
  text-align: center;
  color: #555;
`;

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

const ProjectsScreen: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/projects');
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Container>
        <PageTitle text="Projects" />
        <StatusTypography variant="paragraph-medium">Loading projects...</StatusTypography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PageTitle text="Projects" />
        <StatusTypography variant="paragraph-medium">Error: {error}</StatusTypography>
      </Container>
    );
  }

  if (projects.length === 0) {
    return (
      <Container>
        <PageTitle text="Projects" />
        <StatusTypography variant="paragraph-medium">
          No projects available at the moment.
        </StatusTypography>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle text="Projects" />
      <ProjectList projects={projects} />
    </Container>
  );
};

export default ProjectsScreen;
