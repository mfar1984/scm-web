import type { Metadata } from 'next';
import CircularsClient from './CircularsClient';

export const metadata: Metadata = {
  title: 'SCM Circulars | Technical Information | SCM',
  description: 'Official SCM circulars to ship owners, masters, agents and relevant parties — browse by year and view the PDF documents.',
};

export default function CircularsPage() {
  return <CircularsClient />;
}
