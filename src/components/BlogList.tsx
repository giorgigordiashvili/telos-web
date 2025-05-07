'use client';

import React, { useEffect, useState } from 'react';
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

  @media (max-width: 1280px) {
    padding: 8px;
  }
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

// Interface for blog post data
interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    thumbnail?: string;
    tags?: string[];
  };
  content: string;
}

// Fallback blog data in case CMS data isn't available
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

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all articles');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['all articles']);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch blog posts from the CMS
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/content/blog');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setBlogPosts(data);

        // Extract unique categories from tags
        const tagSets = new Set<string>();
        data.forEach((post: BlogPost) => {
          if (post.frontmatter.tags) {
            post.frontmatter.tags.forEach(tag => tagSets.add(tag));
          }
        });
        setCategories(['all articles', ...Array.from(tagSets)]);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Filter blog posts based on selected category
  const filteredPosts =
    selectedCategory === 'all articles'
      ? blogPosts
      : blogPosts.filter(post => post.frontmatter.tags?.includes(selectedCategory));

  // Fall back to the hardcoded data if no posts are available from the CMS
  const fallbackData = blogData;

  return (
    <Wrapper>
      <BlogListingContainer>
        {categories.map(category => (
          <CategroyFilterButton
            key={category}
            text={category}
            onClick={() => setSelectedCategory(category)}
            selected={selectedCategory === category}
          />
        ))}
      </BlogListingContainer>
      <Container>
        {isLoading ? (
          <p>Loading blog posts...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <BlogCard
              key={post.slug}
              imageSrc={post.frontmatter.thumbnail || '/images/PressCard/default.png'}
              title={post.frontmatter.title}
              category={post.frontmatter.tags?.join(', ') || 'Uncategorized'}
              slug={post.slug}
            />
          ))
        ) : (
          fallbackData.map((item, index) => (
            <BlogCard
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              category={item.category}
            />
          ))
        )}
      </Container>
    </Wrapper>
  );
};

export default BlogList;
