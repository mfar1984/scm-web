import AosInit from '@/components/layout/AosInit';
import NewsClient from './NewsClient';

export const metadata = {
  title: 'News & Updates | SCM - Ships Classification Malaysia',
  description: 'Latest maritime news, company updates, and industry insights from Ships Classification Malaysia.',
};

export default function NewsPage() {
  return (
    <>
      <AosInit />
      <NewsClient />
    </>
  );
}
