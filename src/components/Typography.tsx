import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 50px;
  font-weight: bold;
  line-height: 65px;
`;

const H2 = styled.h2`
  font-size: 36px;
  font-weight: bold;
  line-height: 47px;
`;

const H3 = styled.h3`
  font-weight: bold;
  font-size: 26px;
  line-height: 34px;
`;

const H4 = styled.h4`
  font-weight: bold;
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  letter-spacing: 0%;
`;

const ParagraphBold = styled.p`
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
`;

const ParagraphMedium = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
`;

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph-bold' | 'paragraph-medium';
  children: React.ReactNode;
  className?: string;
};

function Typography({ variant, children, className }: TypographyProps) {
  switch (variant) {
    case 'h1':
      return <H1 className={className}>{children}</H1>;
    case 'h2':
      return <H2 className={className}>{children}</H2>;
    case 'h3':
      return <H3 className={className}>{children}</H3>;
    case 'h4':
      return <H4 className={className}>{children}</H4>;
    case 'paragraph-bold':
      return <ParagraphBold className={className}>{children}</ParagraphBold>;
    case 'paragraph-medium':
      return <ParagraphMedium className={className}>{children}</ParagraphMedium>;
    default:
      return null;
  }
}

export { H1, H2 };
export default Typography;
