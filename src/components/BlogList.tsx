'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';
import CategroyFilterButton from './CategroyFilterButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const BlogListingContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
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

const blogData = [
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'How AI is Changing the Future',
    category: 'category 1',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Top UX Design Patterns in 2025',
    category: 'category 2',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Building Resilient Teams Remotely',
    category: 'category 3',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Why Minimalism Works in UI',
    category: 'category 1',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Climate Tech and Innovation',
    category: 'category 2',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Next.js 15 Features You Should Know',
    category: 'category 3',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Climate Tech and Innovation',
    category: 'category 1',
  },
  {
    imageSrc: '/images/PressCard/default.png',
    title: 'Next.js 15 Features You Should Know',
    category: 'category 2',
  },
];

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all articles');

  const filteredData =
    selectedCategory === 'all articles'
      ? blogData
      : blogData.filter(item => item.category === selectedCategory);

  return (
    <Wrapper>
      <BlogListingContainer>
        <CategroyFilterButton
          text="all articles"
          onClick={() => setSelectedCategory('all articles')}
          selected={selectedCategory === 'all articles'}
        />
        <CategroyFilterButton
          text="category 1"
          onClick={() => setSelectedCategory('category 1')}
          selected={selectedCategory === 'category 1'}
        />

        <CategroyFilterButton
          text="category 2"
          onClick={() => setSelectedCategory('category 2')}
          selected={selectedCategory === 'category 2'}
        />
        <CategroyFilterButton
          text="category 3"
          onClick={() => setSelectedCategory('category 3')}
          selected={selectedCategory === 'category 3'}
        />
      </BlogListingContainer>
      <Container>
        {filteredData.map((item, index) => (
          <BlogCard
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            category={item.category}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default BlogList;
