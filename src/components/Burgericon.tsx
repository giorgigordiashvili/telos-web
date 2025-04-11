"use client";
import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import SideBar from "./SideBar"; // adjust path if needed

const Burgermenu = styled.div`
  display: none;
  position: relative;
  @media (max-width: 900px) {
    display: block;
    cursor: pointer;
  }
`;

const Burgericon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Burgermenu onClick={toggleSidebar}>
        <Image
          alt="Burger menu"
          width={32}
          height={32}
          src="/images/burger side bar.png"
        />
      </Burgermenu>
      {isOpen && <SideBar onClose={toggleSidebar} />}
    </>
  );
};

export default Burgericon;
