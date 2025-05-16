// SvgMenuIcon.tsx
import * as React from 'react';

type SvgProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

const BurgerMenuIcon = ({ color = '#000', ...props }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path
      fill={color}
      d="M5 8.666a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 7.333a1 1 0 0 1 1-1h20a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1Zm0 7.334a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"
    />
  </svg>
);

export default BurgerMenuIcon;
