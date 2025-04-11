import Image from "next/image";
import React from "react";

type Props = { color?: "black" | "blue" | "white" };

function Logo({ color = "black" }: Props) {
  return (
    <Image
      alt="logo"
      width={184}
      height={60}
      src={`/images/logo/${color}.png`}
    />
  );
}

export default Logo;
