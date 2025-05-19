'use client';

import OptionDropdown from '@/components/OptionDropdown';
import PageTitle from '@/components/PageTitle';
import PrimeryButton from '@/components/PrimeryButton';
import PrimeryCheckbox from '@/components/PrimeryCheckbox';
import PrimeryInput from '@/components/PrimeryInput';
import BudgetSlider from '@/components/Slider';
import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

const Page = styled.div`
  margin-top: 60px;

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

const BudgetSliderWrapper = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  color: rgba(3, 23, 22, 0.6);

  &:hover {
    color: rgba(69, 136, 195, 1);
    border-color: rgba(69, 136, 195, 0.4);
  }

  &:focus {
    color: rgba(69, 136, 195, 1);
  }
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
  const defaultMin = min + rangeWidth * 0.25;
  const defaultMax = min + rangeWidth * 0.75;

  return (
    <Page>
      <Toaster />
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
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const stringifiedValues: Record<string, string> = {};
            Object.entries(values).forEach(([key, value]) => {
              stringifiedValues[key] = String(value);
            });

            const payload = {
              'form-name': 'order', // Netlify needs this for AJAX
              ...stringifiedValues,
            };

            try {
              await fetch('/', {
                // POST to the current page for Netlify AJAX
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(payload).toString(),
              });
              console.log('Order form submitted successfully via Netlify AJAX');
              toast.success('Thank you for your order! We will get back to you soon.');
              resetForm();
            } catch (error) {
              console.error('Error submitting order form via Netlify AJAX:', error);
              toast.error(
                'Sorry, there was an issue submitting your order. Please try again later.'
              );
            }
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit} name="order" data-netlify="true">
              {' '}
              {/* Ensure data-netlify="true" is present */}
              {/* Hidden input for Netlify form name */}
              <input type="hidden" name="form-name" value="order" />
              <OptionDropdown
                options={options}
                value={values.option}
                onChange={val => setFieldValue('option', val)}
                name="option" // Added name prop
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
              <BudgetSliderWrapper>
                <p>Budget</p>
                <BudgetSlider
                  minValue={values.minValue}
                  maxValue={values.maxValue}
                  onChange={({ min, max }) => {
                    setFieldValue('minValue', min);
                    setFieldValue('maxValue', max);
                  }}
                />
              </BudgetSliderWrapper>
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
                onChange={handleChange} // Use Formik's handleChange for consistency if preferred, or keep setFieldValue
                name="agreed" // Added name prop
              />
              <Submit>
                <PrimeryButton type="submit" variant="blue" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
