import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | SCM - Ships Classification Malaysia',
  description: 'Contact Ships Classification Malaysia (SCM). Call +603-5513 8170 or email infohq@myscm.com.my. Wisma SCM, Presint Alami, Shah Alam, Selangor.',
};

export default function ContactPage() {
  return <ContactClient />;
}
