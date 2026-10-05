import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery — Surveys, Events & Team | SCM',
  description:
    "Browse Ships Classification Malaysia's photo gallery — vessel surveys and inspections, maritime events, and our team at work. Explore albums by category.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
