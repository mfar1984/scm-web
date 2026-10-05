import ServiceDetail from '@/components/sections/ServiceDetail';
import AosInit from '@/components/layout/AosInit';
import { services } from '@/lib/servicesData';

export const metadata = {
  title: 'Survey & Inspection | Classification Services | SCM',
  description: 'SCM provides classification and statutory surveys — class entry, annual/intermediate/renewal, SOLAS/MARPOL/COLREG, dry-docking, in-water and condition assessments.',
};

export default function Page() {
  return (
    <>
      <AosInit />
      <ServiceDetail data={services['survey-inspection']} />
    </>
  );
}
