"use client";
import React from "react";
import styled from "styled-components";
import Typography from "./Typography";

const Biginput = styled.div`
  resize: none;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(3, 23, 22, 0.4);
`;
const Styleddiv = styled.div`
  width: 100%;
  height: 100%;
  color: rgba(3, 23, 22, 0.6);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: none;

  &:hover {
    color: rgba(69, 136, 195, 1);
    border-color: rgba(69, 136, 195, 0.4);
    ${Biginput} {
      border-color: rgba(69, 136, 195, 0.4);
      color: rgba(3, 23, 22, 0.6);
    }
  }
  &:focus-within {
    ${Biginput} {
      box-shadow: 0px 0px 0px 3px rgba(69, 136, 195, 0.25);
      color: rgba(3, 23, 22, 1);
    }
  }

  &:focus {
    color: rgba(69, 136, 195, 1);
  }
`;

type Props = {
  size: "big" | "small";
  text: string;
  placeholder: string;
};

const PrimeryInput = ({ size, text, placeholder }: Props) => {
  if (size === "big") {
    return (
      <Styleddiv>
        <Typography variant="paragraph-bold">{text}</Typography>
        <Biginput>
          <textarea
            placeholder={placeholder}
            name=""
            style={{
              width: "100%",
              height: "100%",
              outline: "none",
              borderRadius: "inherit",
              resize: "none",
              padding: "16px",
              border: "none",
              color: "inherit",
            }}
          />
        </Biginput>
      </Styleddiv>
    );
  }

  return (
    <Styleddiv>
      <Typography variant="paragraph-bold">{text}</Typography>
      <Biginput>
        <input
          placeholder={placeholder}
          name=""
          style={{
            width: "100%",
            height: "100%",
            outline: "none",
            borderRadius: "inherit",
            resize: "none",
            padding: "16px",
            border: "none",
            color: "inherit",
          }}
        />
      </Biginput>
    </Styleddiv>
  );
};

export default PrimeryInput;
