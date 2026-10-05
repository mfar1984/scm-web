import Link from 'next/link';
import { Highlight } from '@/components/layout/Highlight';

interface SvcItem { icon: string; title: string; description: string; href: string }
interface SvcData { tag?: string; title?: string; subtitle?: string; items?: SvcItem[] }

const fallbackItems: SvcItem[] = [
  { icon: 'bi-clipboard-check', title: 'Survey & Inspection', description: 'Comprehensive classification and statutory surveys throughout a vessel\u2019s lifecycle — from class entry to periodic and renewal surveys.', href: '/services/classification/survey-inspection' },
  { icon: 'bi-rulers', title: 'Plan Approval & Newbuilding', description: 'Design review and newbuilding supervision — verifying structural integrity, stability, and compliance from drawing board to delivery.', href: '/services/classification/plan-approval' },
  { icon: 'bi-patch-check', title: 'Audit & Certification', description: 'Classification and statutory certification for vessels, components, and marine equipment, backed by rigorous audits.', href: '/services/certification' },
  { icon: 'bi-shield-check', title: 'Certification Services', description: 'Statutory and security audits on behalf of flag administrations — ISM, ISPS, MLC, and marine facility security compliance.', href: '/services/classification/audit-certification' },
  { icon: 'bi-lightbulb', title: 'Consultancy & Advisory', description: 'Independent technical consultancy — condition assessments, pre-purchase surveys, project management, and repair supervision.', href: '/services/consultancy' },
];

export default function ServicesHome({ data }: { data?: SvcData }) {
  const tag = data?.tag || 'What We Do';
  const title = data?.title || 'Our **Services**';
  const subtitle = data?.subtitle || 'Comprehensive maritime classification, certification, and consultancy services for the industry.';
  const items: SvcItem[] = data?.items && data.items.length > 0 ? data.items : fallbackItems;

  return (
    <section id="home-services" className="section section-light home-services">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">{tag}</span>
          <h2 className="section-title"><Highlight text={title} /></h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="row g-4 justify-content-center">
          {items.map((s, i) => (
            <div className="col-lg-4 col-md-6" key={s.title} data-aos="fade-up" data-aos-delay={i * 100}>
              <Link href={s.href} className="home-svc-card">
                <div className="home-svc-icon"><i className={`bi ${s.icon}`}></i></div>
                <h3 className="home-svc-title">{s.title}</h3>
                <p className="home-svc-text">{s.description}</p>
                <span className="home-svc-link">Learn More <i className="bi bi-arrow-right"></i></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
