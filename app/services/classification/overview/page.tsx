import ServicesShowcase from '@/components/sections/ServicesShowcase';
import AosInit from '@/components/layout/AosInit';

export const metadata = {
  title: 'Classification Services Overview | SCM',
  description: 'A complete overview of SCM services (01–05): Survey & Inspection, Plan Approval & Newbuilding, Audit & Certification, Statutory Audit, and Consultancy & Advisory.',
};

export default function Page() {
  return (
    <>
      <AosInit />
      <ServicesShowcase
        title="Classification Services"
        heroImage="/image/survey-inspection-min.png"
        crumbs={[
          { label: 'Services', href: '/services' },
          { label: 'Classification Services', href: '/services/classification' },
          { label: 'Overview' },
        ]}
      />
    </>
  );
}
