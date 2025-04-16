'use client';
import OptionDropdown from '@/components/OptionDropdown';
import PageTitle from '@/components/PageTitle';
import PrimeryButton from '@/components/PrimeryButton';
import PrimeryCheckbox from '@/components/PrimeryCheckbox';
import PrimeryInput from '@/components/PrimeryInput';
import BudgetSlider from '@/components/Slider';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  background-image: url('/images/order/back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  padding-top: 130px;
  padding-bottom: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    padding-top: 32px;
    padding-bottom: 48px;
  }
`;

const Main = styled.div`
  padding-inline: 16px;
  justify-self: center;
  width: 564px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  @media (max-width: 1280px) {
    text-align: left;
  }
`;
const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;
  @media (max-width: 1280px) {
  }
`;
const Description = styled.div`
  text-align: left;
  width: 100%;
  height: 198px;
`;
const Submit = styled.div`
  box-shadow: 0px 7px 13.1px -1px rgba(0, 0, 0, 0.43);
  border-radius: 8px;
  width: 100%;
`;

const OrderScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [option, setoption] = useState<string | null>(null);
  const [minBudget, setMinBudget] = useState(100000);
  const [maxBudget, setMaxBudget] = useState(400000);

  const options = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'dada',
    'dauhwud',
    'duqwahd',
  ];

  const handleSubmit = () => {
    console.log({
      option,
      name,
      email,
      number,
      message,
      agreed,
      minBudget,
      maxBudget,
    });
  };

  return (
    <Page>
      <Main>
        <Head>
          <Image src={'/images/order/order.png'} alt="logo" width={40} height={40} />
          <PageTitle text="Order" />
        </Head>

        <Form>
          <OptionDropdown options={options} value={option} onChange={setoption} />
          <PrimeryInput
            type="text"
            size="small"
            text="Name"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <PrimeryInput
            type="email"
            size="small"
            text="Email"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <PrimeryInput
            type="number"
            size="small"
            text="Phone Number"
            placeholder="Enter your Number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </Form>
        <BudgetSlider
          minVal={minBudget}
          maxVal={maxBudget}
          onMinChange={setMinBudget}
          onMaxChange={setMaxBudget}
        />
        <Description>
          <PrimeryInput
            size="big"
            text="Message"
            placeholder="click and start typing"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </Description>
        <PrimeryCheckbox
          label="By submitting this form, you agree to our Privacy Policy"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <Submit onClick={handleSubmit}>
          <PrimeryButton variant="blue">Submit</PrimeryButton>
        </Submit>
      </Main>
    </Page>
  );
};

export default OrderScreen;
