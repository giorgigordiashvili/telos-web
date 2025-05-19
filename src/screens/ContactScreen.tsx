'use client';
import PageTitle from '@/components/PageTitle';
import PrimeryButton from '@/components/PrimeryButton';
import PrimeryCheckbox from '@/components/PrimeryCheckbox';
import PrimeryInput from '@/components/PrimeryInput';
import Image from 'next/image';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 96px;
  margin-top: 60px;

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

    .Bigimage {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
  }
`;
const Form = styled.form`
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

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
  agreed: Yup.boolean().oneOf([true], 'You must agree to continue'),
});

const ContactScreen = () => {
  return (
    <Main>
      <Title>
        <PageTitle text="Contact Us" />
      </Title>
      <Body>
        <Image
          alt="contact us"
          src={'/images/Contactus/contact.png'}
          width={564}
          height={555}
          className="Bigimage"
        />
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
            agreed: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const payload: Record<string, string> = {
              'form-name': 'contact', // Hidden field for Netlify
            };
            Object.entries(values).forEach(([key, value]) => {
              payload[key] = String(value);
            });

            try {
              await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(payload).toString(),
              });
              console.log('Form submitted successfully to /__forms.html');
              alert('Thank you for your message! We will get back to you soon.');
              resetForm();
            } catch (error) {
              console.error('Error submitting form to /__forms.html:', error);
              alert('Sorry, there was an issue submitting your form. Please try again later.');
            }
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, errors, isSubmitting }) => {
            console.log('Formik Errors:', errors);

            return (
              <Form onSubmit={handleSubmit} name="contact">
                <Fullname>
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
                </Fullname>
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
                  onChange={handleChange} // Use Formik's handleChange
                  name="agreed" // Name attribute for Formik
                />
                <div>
                  <PrimeryButton type="submit" variant="blue" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </PrimeryButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Body>
    </Main>
  );
};

export default ContactScreen;
