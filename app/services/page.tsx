import Link from 'next/link';
import HeroInner from '@/components/sections/HeroInner';
import AnimatedBg from '@/components/layout/AnimatedBg';
import AosInit from '@/components/layout/AosInit';

export const metadata = {
  title: 'Our Services | SCM - Ships Classification Malaysia',
  description: 'Explore SCM services: Classification Services, Certification Services, and Consultancy & Advisory for the maritime industry.',
};

const categories = [
  {
    title: 'Classification Services',
    href: '/services/classification',
    image: '/image/survey-inspection-min.png',
    icon: 'bi-clipboard-check',
    desc: 'Classification and statutory surveys, plan approval, newbuilding supervision and statutory audits for vessels throughout their lifecycle.',
    items: [
      { label: 'Survey & Inspection', href: '/services/classification/survey-inspection' },
      { label: 'Plan Approval & Newbuilding', href: '/services/classification/plan-approval' },
      { label: 'Statutory Audit', href: '/services/classification/statutory-audit' },
    ],
  },
  {
    title: 'Certification Services',
    href: '/services/certification',
    image: '/image/certification-min-1.png',
    icon: 'bi-patch-check',
    desc: 'Class and component certification, bollard pull, welding & welder qualification, and ISM/ISPS/MLC certification.',
    items: [],
  },
  {
    title: 'Consultancy & Advisory',
    href: '/services/consultancy',
    image: '/image/consultancy-min.png',
    icon: 'bi-lightbulb',
    desc: 'Independent technical consultancy — condition assessments, pre-purchase surveys, project management and repair supervision.',
    items: [],
  },
];

export default function ServicesPage() {
  return (
    <>
      <AosInit />
      <HeroInner
        title="Our Services"
        image="/image/survey-inspection-min.png"
        crumbs={[{ label: 'Services' }]}
      />

      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="icons" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our Service Areas</h2>
            <p className="section-subtitle">
              SCM delivers end-to-end maritime services to international standards. Choose a
              category below to explore what we offer.
            </p>
          </div>

          <div className="row g-4">
            {categories.map((c, i) => (
              <div className="col-lg-4 col-md-6" key={c.title}>
                <div className="svc-hub-card" data-aos="fade-up" data-aos-delay={`${i * 80}`}>
                  <Link href={c.href} className="svc-hub-media" style={{ backgroundImage: `url(${c.image})`, display: 'block' }}>
                    <div className="svc-hub-icon"><i className={`bi ${c.icon}`}></i></div>
                  </Link>
                  <div className="svc-hub-body">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    {c.items.length > 0 && (
                      <ul className="svc-cat-sublist">
                        {c.items.map((it) => (
                          <li key={it.href}>
                            <Link href={it.href}><i className="bi bi-chevron-right"></i> {it.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href={c.href} className="svc-related-link">
                      View Details <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-light">
        <div className="container">
          <div className="au-cta-box">
            <div className="au-cta-left">
              <h2>Ready to Work With SCM?</h2>
              <p>Speak with our team to discuss your vessel or project requirements.</p>
            </div>
            <div className="au-cta-right">
              <Link href="/contact" className="au-btn-primary">
                <i className="bi bi-envelope-fill"></i> Contact Us
              </Link>
              <Link href="/about/about-us" className="au-btn-outline">
                <i className="bi bi-info-circle"></i> About SCM
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
