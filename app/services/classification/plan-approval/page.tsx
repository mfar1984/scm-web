import ServiceDetail from '@/components/sections/ServiceDetail';
import AosInit from '@/components/layout/AosInit';
import { services } from '@/lib/servicesData';

export const metadata = {
  title: 'Plan Approval & Newbuilding | Classification Services | SCM',
  description: 'Ship design review, drawings approval, newbuilding construction supervision, tonnage & load line calculations, EEDI/EEXI verification and stability assessment.',
};

export default function Page() {
  return (
    <>
      <AosInit />
      <ServiceDetail data={services['plan-approval']} />
    </>
  );
}
