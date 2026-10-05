import ServiceDetail from '@/components/sections/ServiceDetail';
import AosInit from '@/components/layout/AosInit';
import { services } from '@/lib/servicesData';

export const metadata = {
  title: 'Audit & Certification Services | SCM',
  description: 'Class and component certification, bollard pull, towing, welding procedure & welder qualification, ISM/ISPS Code and MLC certification.',
};

export default function Page() {
  return (
    <>
      <AosInit />
      <ServiceDetail data={services['certification']} />
    </>
  );
}
