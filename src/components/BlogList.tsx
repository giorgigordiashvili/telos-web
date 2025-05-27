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
    description?: string; // Added to match Acceleration collection
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

interface BlogListProps {
  collectionName?: string;
}

// Define a type for the fallback data items
interface FallbackBlogItem {
  imageSrc: string;
  title: string;
  category: string;
  slug?: string; // Add slug to fallback if needed, or generate on the fly
}

const BlogList: React.FC<BlogListProps> = ({ collectionName = 'blog' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all articles');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['all articles']);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Determine basePath based on collectionName
  const basePath = collectionName === 'acceleration' ? 'acceleration' : 'blog';

  // Fetch blog posts from the CMS
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`/api/content/${collectionName}`); // Use collectionName in API path
        if (!response.ok) throw new Error(`Failed to fetch ${collectionName} posts`);
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
  }, [collectionName]); // Add collectionName to dependency array

  // Filter blog posts based on selected category
  const filteredPosts =
    selectedCategory === 'all articles'
      ? blogPosts
      : blogPosts.filter(post => post.frontmatter.tags?.includes(selectedCategory));

  // Fall back to the hardcoded data if no posts are available from the CMS
  const fallbackData: FallbackBlogItem[] = blogData; // Use the new type for fallbackData

  return (
    <Wrapper>
      <BlogListingContainer>
        {/* Render category filter buttons */}
        {categories.map(category => (
          <CategroyFilterButton
            key={category}
            text={category}
            selected={selectedCategory === category} // Changed isActive to selected
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </BlogListingContainer>
      <Container>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <BlogCard
              key={post.slug}
              imageSrc={post.frontmatter.thumbnail || '/images/PressCard/default.png'}
              title={post.frontmatter.title}
              category={post.frontmatter.tags?.[0] || 'uncategorized'} // Use first tag as category or fallback
              slug={post.slug}
              basePath={basePath} // Pass basePath to BlogCard
            />
          ))
        ) : fallbackData.length > 0 ? (
          fallbackData.map((post, index) => (
            <BlogCard
              key={`fallback-${index}`}
              imageSrc={post.imageSrc}
              title={post.title}
              category={post.category}
              slug={post.slug} // Assuming fallback might have slugs
              basePath={basePath} // Pass basePath to BlogCard for fallback too
            />
          ))
        ) : (
          <p>No posts available in this category.</p>
        )}
      </Container>
    </Wrapper>
  );
};

export default BlogList;
