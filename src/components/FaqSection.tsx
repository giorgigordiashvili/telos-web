// FAQSection.tsx
import React from 'react';
import styled from 'styled-components';
import Accordion from './Accordion'; // update path as needed

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1280px) {
    width: 100%;
    padding-inline: 16px;
  }
`;

const faqData = [
  {
    question: 'What is your main service?',
    answer:
      'We specialize in building scalable web and mobile apps using modern technologies like React and Next.js.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'It depends on the scope, but most projects are completed within 4 to 8 weeks.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we offer maintenance and continuous improvement packages after launch.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we offer maintenance and continuous improvement packages after launch.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we offer maintenance and continuous improvement packages after launch.',
  },
];

const FAQSection = () => {
  return (
    <Wrapper>
      {faqData.map((faq, index) => (
        <Accordion key={index} question={faq.question} answer={faq.answer} />
      ))}
    </Wrapper>
  );
};

export default FAQSection;
