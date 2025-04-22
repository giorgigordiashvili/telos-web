'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  color?: 'black' | 'blue' | 'white';
  href?: string;
};

export default function Logo({ color = 'black', href }: Props) {
  const logoImage = (
    <Image alt="logo" width={184} height={60} src={`/images/logo/${color}.png`} priority />
  );

  return href ? (
    <Link href={href} aria-label="Home">
      {logoImage}
    </Link>
  ) : (
    logoImage
  );
}
