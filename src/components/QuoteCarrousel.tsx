'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Quote from './Quote';
import Typography from './Typography'; // Assuming Typography is used for loading/error states

// Define a styled component for error messages
const ErrorTypography = styled(Typography)`
  color: red;
`;

interface QuoteItem {
  id?: string; // Optional: if you have a unique ID from the CMS
  imageSrc: string;
  text: string;
  name: string;
  company: string;
  order?: number;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f7f9fc;

  @media (max-width: 1280px) {
    padding: 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1152px;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FadeLeft = styled.div`
  position: absolute;
  top: 0;
  left: -2px;
  width: 98px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(90deg, #f7f9fc 0%, rgba(247, 249, 252, 0) 100%);
  z-index: 1;

  @media (max-width: 1280px) {
    width: 44px;
    height: 315px;
  }
`;

const FadeRight = styled(FadeLeft)`
  left: auto;
  right: -2px;
  background: linear-gradient(270deg, #f7f9fc 0%, rgba(247, 249, 252, 0) 100%);
`;

const Slide = styled.div`
  flex: none;
  scroll-snap-align: start;
`;

const QuoteOuter = styled.div`
  display: flex;
  align-items: flex-end;
  height: 417px;

  @media (max-width: 1280px) {
    height: 315px;
  }
`;

const QuoteCarousel: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/quotes');
        if (!response.ok) {
          throw new Error(`Failed to fetch quotes: ${response.statusText}`);
        }
        let data = await response.json();
        // Sort by order if available
        if (data.length > 0 && data[0].order !== undefined) {
          data = data.sort((a: QuoteItem, b: QuoteItem) => (a.order || 0) - (b.order || 0));
        }
        setQuotes(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
        setQuotes([]); // Clear or set to fallback
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return <Typography variant="paragraph-medium">Loading quotes...</Typography>;
  }

  if (error) {
    return <ErrorTypography variant="paragraph-medium">Error: {error}</ErrorTypography>;
  }

  if (quotes.length === 0) {
    return <Typography variant="paragraph-medium">No quotes available at the moment.</Typography>;
  }

  return (
    <Wrapper>
      <CarouselContainer>
        <FadeLeft />
        <FadeRight />

        <ScrollArea>
          {quotes.map((q, idx) => (
            <Slide key={q.id || q.name || idx}>
              <QuoteOuter>
                <Quote imageSrc={q.imageSrc} text={q.text} name={q.name} company={q.company} />
              </QuoteOuter>
            </Slide>
          ))}
        </ScrollArea>
      </CarouselContainer>
    </Wrapper>
  );
};

export default QuoteCarousel;
