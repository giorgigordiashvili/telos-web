// Accordion.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@/components/Typography';
import AccordionDropdown from '@/icons/AccordionDropdown';

type Props = {
  question: string;
  answer: string;
};

const AccordionWrapper = styled.div`
  width: 630px;
`;

const AccordionContainer = styled.div`
  border: 1px solid #00000033;
  border-radius: 16px;
  overflow: hidden;
`;

const AccordionButton = styled.button`
  width: 100%;
  height: 77px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  cursor: pointer;
  border: none;
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

const Accordion = ({ question, answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionWrapper>
      <AccordionContainer>
        <AccordionButton onClick={() => setIsOpen(!isOpen)}>
          <Typography variant="h4">{question}</Typography>
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
