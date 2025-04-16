'use client';

import OptionDropdown from '@/components/OptionDropdown';
import PageTitle from '@/components/PageTitle';
import PrimeryButton from '@/components/PrimeryButton';
import PrimeryCheckbox from '@/components/PrimeryCheckbox';
import PrimeryInput from '@/components/PrimeryInput';
import BudgetSlider from '@/components/Slider';
import Image from 'next/image';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;
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

const validationSchema = Yup.object({
  option: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  number: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
  agreed: Yup.boolean().oneOf([true], 'You must agree to continue'),
});

const OrderScreen = () => {
  const min = 0;
  const max = 500000;

  const rangeWidth = max - min;
  const defaultMin = min + rangeWidth * 0.25; // 25%
  const defaultMax = min + rangeWidth * 0.75; // 75%

  const [budgetRange, setBudgetRange] = useState({
    min: defaultMin,
    max: defaultMax,
  });

  return (
    <Page>
      <Main>
        <Head>
          <Image src={'/images/order/order.png'} alt="logo" width={40} height={40} />
          <PageTitle text="Order" />
        </Head>

        <Formik
          initialValues={{
            option: '',
            name: '',
            email: '',
            number: '',
            message: '',
            agreed: false,
            minValue: defaultMin,
            maxValue: defaultMax,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log('Submitted Values:', values);
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, errors }) => (
            <Form onSubmit={handleSubmit}>
              <OptionDropdown
                options={options}
                value={values.option}
                onChange={val => setFieldValue('option', val)}
              />
              <PrimeryInput
                type="text"
                size="small"
                text="Name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                name="name"
              />
              <PrimeryInput
                type="email"
                size="small"
                text="Email"
                placeholder="Enter your Email"
                value={values.email}
                onChange={handleChange}
                name="email"
              />
              <PrimeryInput
                type="number"
                size="small"
                text="Phone Number"
                placeholder="Enter your Number"
                value={values.number}
                onChange={handleChange}
                name="number"
              />

              <BudgetSlider
                minValue={values.minValue}
                maxValue={values.maxValue}
                onChange={({ min, max }) => {
                  setBudgetRange({ min, max });
                  setFieldValue('minValue', min);
                  setFieldValue('maxValue', max);
                }}
              />

              <Description>
                <PrimeryInput
                  size="big"
                  text="Message"
                  placeholder="click and start typing"
                  value={values.message}
                  onChange={handleChange}
                  name="message"
                />
              </Description>

              <PrimeryCheckbox
                label="By submitting this form, you agree to our Privacy Policy"
                checked={values.agreed}
                onChange={() => setFieldValue('agreed', !values.agreed)}
              />

              <Submit>
                <PrimeryButton type="submit" variant="blue">
                  Submit
                </PrimeryButton>
              </Submit>
            </Form>
          )}
        </Formik>
      </Main>
    </Page>
  );
};

export default OrderScreen;
