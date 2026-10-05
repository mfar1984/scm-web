import type { Metadata } from 'next';
import DocumentClient from './DocumentClient';

export const metadata: Metadata = {
  title: 'Forms & Documents | SCM - Ships Classification Malaysia',
  description: 'Download SCM forms, company profile, guidelines and technical documents for the maritime industry.',
};

export default function DocumentPage() {
  return <DocumentClient />;
}
