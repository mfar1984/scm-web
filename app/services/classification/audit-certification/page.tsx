import ServiceDetail from '@/components/sections/ServiceDetail';
import AosInit from '@/components/layout/AosInit';
import { services } from '@/lib/servicesData';

export const metadata = {
  title: 'Statutory Audit | Classification Services | SCM',
  description: 'ISM, ISPS, MLC & ILO audits, vendor audits, and Marine Facility Security Assessment (MFSA) and Plan (MFSP) by Ships Classification Malaysia.',
};

export default function Page() {
  return (
    <>
      <AosInit />
      <ServiceDetail data={services['audit-certification']} />
    </>
  );
}
