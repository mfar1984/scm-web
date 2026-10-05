import type { Metadata } from 'next';
import VendorsClient from './VendorsClient';

export const metadata: Metadata = {
  title: 'Approved Vendors / Service Suppliers | SCM',
  description: 'List and details of SCM approved vendors and service suppliers by service category — ultrasonic thickness measurement, in-water survey, radio survey, and more.',
};

export default function VendorsPage() {
  return <VendorsClient />;
}
