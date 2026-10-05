import type { Metadata } from 'next';
import AosInit from '@/components/layout/AosInit';
import FaqClient, { type FaqCategory, type FaqHero } from './FaqClient';
import { fetchPageContent } from '@/lib/pageContent';

export const metadata: Metadata = {
  title: 'FAQ | SCM - Ships Classification Malaysia',
  description: 'Frequently asked questions about Ships Classification Malaysia — our services, surveys, certification, approved vendors and careers.',
};

interface FaqContent {
  hero?: FaqHero;
  categories?: { items?: FaqCategory[] };
}

export default async function FaqPage() {
  const c = (await fetchPageContent<FaqContent>('resources/faq')) || {};
  const hero = c.hero;
  const categories = c.categories?.items;

  return (
    <>
      <AosInit />
      <FaqClient hero={hero} categories={categories} />
    </>
  );
}
