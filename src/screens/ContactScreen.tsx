"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import PrimeryInput from "@/components/PrimeryInput";
import PrimeryCheckbox from "@/components/PrimeryCheckbox";
import PrimeryButton from "@/components/PrimeryButton";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

const Main = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 96px;
  @media (max-width: 1280px) {
    margin-bottom: 48px;
    padding-inline: 16px;
  }
`;
const Title = styled.div`
  margin-top: 96px;
  margin-bottom: 96px;
  @media (max-width: 1280px) {
    margin-top: 32px;
    margin-bottom: 48px;
  }
`;
const Body = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  @media (max-width: 1280px) {
    flex-direction: column;
    gap: 0;
    width: 100%;

    .Bigimage {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
  }
`;
const Form = styled.div`
  width: 564px;
  height: 459px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (max-width: 1280px) {
    width: 100%;
    gap: 16px;
  }
`;
const Fullname = styled.div`
  display: flex;
  gap: 24px;
  text-align: left;
  @media (max-width: 1280px) {
    flex-direction: column;
    gap: 16px;
  }
`;
const Description = styled.div`
  text-align: left;
  height: 165px;
`;
type Props = {};
const ContactScreen = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    console.log({
      name,
      email,
      message,
      agreed,
    });
  };

  return (
    <Main>
      <Title>
        <PageTitle text="Contact Us" />
      </Title>
      <Body>
        <Image
          alt="contact us"
          src={"/images/Contactus/contact.png"}
          width={564}
          height={555}
          className="Bigimage"
        />
        <Form>
          <Fullname>
            <PrimeryInput
              size="small"
              text="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PrimeryInput
              size="small"
              text="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Fullname>
          <Description>
            <PrimeryInput
              size="big"
              text="Message"
              placeholder="click and start typing"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Description>
          <PrimeryCheckbox
            label="By submitting this form, you agree to our Privacy Policy"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <div onClick={handleSubmit}>
            <PrimeryButton variant="blue">Submit</PrimeryButton>
          </div>
        </Form>
      </Body>
    </Main>
  );
};

export default ContactScreen;
