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

// const faqData = [
//   {
//     question: '1. What is your main service?',
//     answer:
//       'We specialize in building scalable web and mobile apps using modern technologies like React and Next.js.',
//   },
//   {
//     question: '2. How long does a typical project take?',
//     answer: 'It depends on the scope, but most projects are completed within 4 to 8 weeks.',
//   },
//   {
//     question: '3. Do you provide post-launch support?',
//     answer: 'Yes, we offer maintenance and continuous improvement packages after launch.',
//   },
//   {
//     question: '4. Do you provide post-launch support?',
//     answer: 'Yes, we offer maintenance and continuous improvement packages after launch.',
//   },
//   {
//     question: '5. Do you provide post-launch support?',
//     answer: 'Yes, we offer maintenance and continuous improvement packages after launch.',
//   },
// ];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
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
        if (data.length > 0 && data[0].order !== undefined) {
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
        <Accordion key={faq.id || faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </Wrapper>
  );
};

export default FAQSection;
