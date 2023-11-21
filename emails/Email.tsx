
import * as React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import tailwindConfig from '../tailwind.config';

export type SendEmailProps = {
  from: string,
  email: string,
  phone: string,
  message: string,
}

export function Email({
  from,
  email,
  phone,
  message
}: SendEmailProps) {
  const baseUrl = "asdf"
  return (
    // <Html>
    //   <Head />
    //   <Body style={main}>
    //     <Tailwind config={tailwindConfig}>
    //       <Container style={container}>
    //         <Img
    //           src={`https://brodheadaviation.com/badgerworks.png`}
    //           width={295}
    //           height={188}
    //           alt="BA logo"
    //         />
    //         <h1 className='text-3xl font-bold mt-12'>Message from {from}</h1>
    //         <div className='mt-6 text-lg flex flex-col'>
    //           <p><span className='font-bold'>From:</span> {from}</p>
    //           <p><span className='font-bold'>Email:</span> {email}</p>
    //           <p><span className='font-bold'>Phone:</span> {phone}</p>
    //           <p className='whitespace-pre'><span className='font-bold mb-1'>Message:</span><br />{message}</p>
    //         </div>

    //         <hr className='border-gray-300 border-opacity-50 mt-12' />
    //         <p className='pl-4 text-gray-500'>Form sent from <a href='https://brodheadaviation.com'>https://brodheadaviation.com</a></p>
    //       </Container>
    //     </Tailwind>
    //   </Body>
    // </Html>
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={`https://brodheadaviation.com/badgerworks.png`}
              width={295}
              height={188}
              alt="BA logo"
            />
          </Section>

          <Section style={paragraphContent}>
            <Hr style={hr} />
            <Text style={heading}>Message from {from}</Text>
            <Text style={paragraph}><span style={bold}>Email:</span> {email}</Text>
            <Text style={paragraph}><span style={bold}>Phone:</span> {phone}</Text>
            <Text style={paragraph}><span style={bold}>Message:</span><br/><br/>{message}</Text>
            <Hr style={hr} />
          </Section>

          <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
            <Text
              style={{
                ...paragraph,
                fontSize: '12px',
                textAlign: 'center',
                margin: 0,
              }}
            >
              Form sent from <a href='https://brodheadaviation.com'>https://brodheadaviation.com</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default Email;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '30px auto',
  width: '610px',
  backgroundColor: '#fff',
  borderRadius: 5,
  overflow: 'hidden',
};

const bold = {
  fontWeight: "bold"
}

const heading = {
  fontSize: '20px',
  lineHeight: '26px',
  fontWeight: '700',
  color: '#B47A31',
};

const paragraphContent = {
  padding: '0 40px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '22px',
  color: '#3c4043',
};

const hr = {
  borderColor: '#e8eaed',
  margin: '20px 0',
};