import ServiceDetail from '@/components/sections/ServiceDetail';
import AosInit from '@/components/layout/AosInit';
import { services } from '@/lib/servicesData';

export const metadata = {
  title: 'Consultancy & Advisory Services | SCM',
  description: 'Independent technical consultancy — condition assessments, pre-purchase & damage surveys, ship conversion, project management and repair supervision.',
};

export default function Page() {
  return (
    <>
      <AosInit />
      <ServiceDetail data={services['consultancy']} />
    </>
  );
}
