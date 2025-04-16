import * as React from "react"

interface AccordionDropdownProps extends React.SVGProps<SVGSVGElement> {}

const AccordionDropdown = (props: AccordionDropdownProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <rect width={24} height={24} y={0.5} fill="#031716" rx={12} />
    <path stroke="#fff" d="m7 10 5 5 5-5" />
  </svg>
)
export default AccordionDropdown
