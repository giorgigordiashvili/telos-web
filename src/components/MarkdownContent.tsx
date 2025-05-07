import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const StyledMarkdown = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 1.25rem;
    line-height: 1.7;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #3182ce;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
  }

  blockquote {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
  }

  code {
    background-color: #f7fafc;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: var(--font-geist-mono);
    font-size: 0.875em;
  }
`;

const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
  return (
    <StyledMarkdown className={className}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </StyledMarkdown>
  );
};

export default MarkdownContent;
