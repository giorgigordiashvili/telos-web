'use client';
import React from 'react';
import styled from 'styled-components';

const Biginput = styled.div`
  background-color: rgba(248, 248, 248, 1);
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
  font-size: 14px;
  color: rgba(3, 23, 22, 0.6);
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  @media (max-width: 1280px) {
    gap: 12px;
  }
`;

type Props = {
  name: string;
  size: 'big' | 'small';
  text: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'number' | 'email';
};

const PrimeryInput = ({ name, type, size, text, placeholder, value, onChange }: Props) => {
  if (size === 'big') {
    return (
      <Styleddiv>
        <p>{text}</p>
        <Biginput>
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
              width: '100%',
              height: '100%',
              outline: 'none',
              borderRadius: 'inherit',
              resize: 'none',
              padding: '16px',
              border: 'none',
              color: 'inherit',
              backgroundColor: 'inherit',
            }}
          />
        </Biginput>
      </Styleddiv>
    );
  }

  return (
    <Styleddiv>
      <p>{text}</p>
      <Biginput>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            height: '100%',
            outline: 'none',
            borderRadius: 'inherit',
            padding: '16px',
            border: 'none',
            color: 'inherit',
            backgroundColor: 'inherit',
          }}
        />
      </Biginput>
    </Styleddiv>
  );
};

export default PrimeryInput;
