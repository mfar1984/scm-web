import Link from 'next/link';
import HeroInner from '@/components/sections/HeroInner';
import AnimatedBg from '@/components/layout/AnimatedBg';
import AosInit from '@/components/layout/AosInit';
import { serviceList } from '@/lib/servicesData';

export const metadata = {
  title: 'Classification Services | SCM',
  description: 'Ships Classification Malaysia services: Survey & Inspection, Plan Approval & Newbuilding, Audit & Certification, Statutory Audit and Consultancy & Advisory.',
};

const items = serviceList;

function hrefFor(slug: string) {
  if (slug === 'certification') return '/services/certification';
  if (slug === 'consultancy') return '/services/consultancy';
  return `/services/classification/${slug}`;
}

export default function ClassificationPage() {
  return (
    <>
      <AosInit />
      <HeroInner
        title="Classification Services"
        image="/image/survey-inspection-min.png"
        crumbs={[{ label: 'Services', href: '/services' }, { label: 'Classification Services' }]}
      />

      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="waves" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Services</span>
            <h2 className="section-title">Complete Range of Services</h2>
            <p className="section-subtitle">
              SCM classifies and certifies Malaysian-registered vessels in accordance with SCM Rules
              and international maritime conventions. Explore our five core service areas below.
            </p>
            <Link href="/services/classification/overview" className="au-btn-outline" style={{ marginTop: 18 }}>
              <i className="bi bi-list-ul"></i> View Full Overview (01–05)
            </Link>
          </div>

          <div className="row g-4 justify-content-center">
            {items.map((s, i) => (
              <div className="col-lg-4 col-md-6" key={s.slug}>
                <Link href={hrefFor(s.slug)} className="svc-hub-card" data-aos="fade-up" data-aos-delay={`${i * 80}`}>
                  <div className="svc-hub-media" style={{ backgroundImage: `url(${s.image})` }}>
                    <span className="svc-hub-number">{s.number}</span>
                    <div className="svc-hub-icon"><i className={`bi ${s.icon}`}></i></div>
                  </div>
                  <div className="svc-hub-body">
                    <span className="svc-hub-tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <p>{s.intro}</p>
                    <span className="svc-related-link">Learn More <i className="bi bi-arrow-right"></i></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
