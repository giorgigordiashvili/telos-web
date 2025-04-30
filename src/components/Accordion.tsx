import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';
import AccordionDropdown from '@/icons/AccordionDropdown';

type Props = {
  question: string;
  answer: string;
};

const AccordionWrapper = styled.div`
  max-width: 760px;

  @media (max-width: 1280px) {
    width: 100%;
    max-width: 100%;
  }
`;

const AccordionContainer = styled.div`
  border: 1px solid #00000033;
  border-radius: 16px;
  overflow: hidden;
`;

const AccordionButton = styled.button`
  width: 760px;
  height: 77px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  cursor: pointer;
  border: none;

  @media (max-width: 1280px) {
    width: 100%;
    max-width: 100%;
  }
`;

const DropdownIconWrapper = styled.div<{ $isOpen: boolean }>`
  svg {
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #00000033;
  margin: 0 24px;
`;

const AccordionContent = styled.div`
  padding: 24px;
`;

// New styled override: shrink h4 to 14px on mobile
const QuestionText = styled(Typography)`
  @media (max-width: 1280px) {
    font-size: 14px;
    font-weight: 700;
    line-height: 120%;
  }
`;

const Accordion = ({ question, answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionWrapper>
      <AccordionContainer>
        <AccordionButton onClick={() => setIsOpen(!isOpen)}>
          <QuestionText variant="h4">{question}</QuestionText>
          <DropdownIconWrapper $isOpen={isOpen}>
            <AccordionDropdown />
          </DropdownIconWrapper>
        </AccordionButton>

        {isOpen && (
          <>
            <Divider />
            <AccordionContent>
              <Typography variant="paragraph-medium">{answer}</Typography>
            </AccordionContent>
          </>
        )}
      </AccordionContainer>
    </AccordionWrapper>
  );
};

export default Accordion;
