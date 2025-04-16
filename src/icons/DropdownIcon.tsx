const DropdownIcon = ({ color = '#031716' }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={9} fill="none">
    <path stroke={color} strokeOpacity={0.5} strokeWidth={1.5} d="m1 1 6 6 6-6" />
  </svg>
);
export default DropdownIcon;
