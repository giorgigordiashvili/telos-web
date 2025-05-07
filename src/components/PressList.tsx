'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PressCard from './PressCard';

interface PressItem {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    source: string;
    image?: string;
    link?: string;
  };
  content: string;
}

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

// Fallback press data in case CMS data isn't available
const pressData = [
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Press Name',
    subtitle: 'Article name - headline for article',
    date: 'Date (year)',
  },
];

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch (error) {
    return dateString;
  }
};

const PressList = () => {
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch press items from CMS
  useEffect(() => {
    const fetchPressItems = async () => {
      try {
        const response = await fetch('/api/content/press');
        if (!response.ok) throw new Error('Failed to fetch press items');
        const data = await response.json();
        setPressItems(data);
      } catch (error) {
        console.error('Error fetching press items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPressItems();
  }, []);

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <p>Loading press items...</p>
        ) : pressItems.length > 0 ? (
          pressItems.map(item => (
            <PressCard
              key={item.slug}
              imageSrc={item.frontmatter.image || '/images/PressCard/default.png'}
              title={item.frontmatter.source}
              subtitle={item.frontmatter.title}
              date={formatDate(item.frontmatter.date)}
              slug={item.slug}
              externalLink={item.frontmatter.link}
            />
          ))
        ) : (
          pressData.map((item, index) => (
            <PressCard
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
            />
          ))
        )}
      </Container>
    </Wrapper>
  );
};

export default PressList;
