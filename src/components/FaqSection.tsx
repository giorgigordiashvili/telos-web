// FAQSection.tsx
import React, { useEffect, useState } from 'react';
import Accordion from './Accordion'; // update path as needed
import Typography from './Typography';
import styled from 'styled-components'; // Import styled-components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1280px) {
    width: 100%;
    padding-inline: 16px;
  }
`;

const ErrorTypography = styled(Typography)`
  color: red;
`;

interface FAQItemFrontmatter {
  question: string;
  answer: string;
  order?: number;
}

interface FAQItem {
  id?: string; // Optional: if you have a unique ID from the CMS
  slug?: string;
  frontmatter: FAQItemFrontmatter;
  order?: number; // Keep order here if sorting is based on a top-level field
}

const FAQSection = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/faq');
        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
        }
        let data = await response.json();
        // Sort by order if available
        if (data.length > 0 && data[0].frontmatter && data[0].frontmatter.order !== undefined) {
          data = data.sort(
            (a: FAQItem, b: FAQItem) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0)
          );
        } else if (data.length > 0 && data[0].order !== undefined) {
          // Fallback for older structure
          data = data.sort((a: FAQItem, b: FAQItem) => (a.order || 0) - (b.order || 0));
        }
        setFaqItems(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
        setFaqItems([]); // Clear items or set to default/fallback
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return <Typography variant="paragraph-medium">Loading FAQs...</Typography>;
  }

  if (error) {
    return <ErrorTypography variant="paragraph-medium">Error: {error}</ErrorTypography>;
  }

  if (faqItems.length === 0) {
    return <Typography variant="paragraph-medium">No FAQs available at the moment.</Typography>;
  }

  return (
    <Wrapper>
      {faqItems.map(faq => (
        <Accordion
          key={faq.id || faq.slug || faq.frontmatter.question}
          question={faq.frontmatter.question}
          answer={faq.frontmatter.answer}
        />
      ))}
    </Wrapper>
  );
};

export default FAQSection;
