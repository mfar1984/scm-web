import Link from 'next/link';
import HeroInner from '@/components/sections/HeroInner';
import AnimatedBg from '@/components/layout/AnimatedBg';
import { ServiceData, serviceList } from '@/lib/servicesData';

export default function ServiceDetail({ data }: { data: ServiceData }) {
  const related = serviceList.filter(s => s.slug !== data.slug).slice(0, 4);

  return (
    <>
      <HeroInner
        title={data.title}
        image={data.image}
        crumbs={[
          { label: 'Services', href: '/services' },
          { label: data.parentLabel, href: data.parentHref },
          { label: data.title },
        ]}
      />

      {/* Overview */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="rings" />
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="svc-overview">
                <span className="svc-number">{data.number}</span>
                <span className="section-tag">{data.tag}</span>
                <h2 className="section-title text-start">{data.title}</h2>
                <p>{data.intro}</p>
                <Link href="/contact" className="au-btn-primary">
                  <i className="bi bi-send-fill"></i> Enquire Now
                </Link>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
              <div className="svc-figure">
                <span className="svc-figure-circle" />
                <img src={data.image} alt={data.title} />
                <div className="svc-figure-icon"><i className={`bi ${data.icon}`}></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section section-light has-anim-bg">
        <AnimatedBg variant="grid" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Scope of Work</span>
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              A complete range of {data.title.toLowerCase()} services delivered to international standards.
            </p>
          </div>
          <div className="svc-offer-grid">
            {data.offerings.map((item, i) => (
              <div className="svc-offer-item" key={i} data-aos="fade-up" data-aos-delay={`${(i % 3) * 60}`}>
                <span className="svc-offer-check"><i className="bi bi-check-lg"></i></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services + CTA */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore More</span>
            <h2 className="section-title">Other Services</h2>
          </div>
          <div className="row g-4">
            {related.map((s) => (
              <div className="col-lg-3 col-md-6" key={s.slug}>
                <Link
                  href={s.slug === 'certification' ? '/services/certification'
                    : s.slug === 'consultancy' ? '/services/consultancy'
                    : `/services/classification/${s.slug}`}
                  className="svc-related-card"
                >
                  <div className="svc-related-icon"><i className={`bi ${s.icon}`}></i></div>
                  <h3>{s.title}</h3>
                  <span className="svc-related-link">View Service <i className="bi bi-arrow-right"></i></span>
                </Link>
              </div>
            ))}
          </div>

          <div className="au-cta-box" style={{ marginTop: '48px' }}>
            <div className="au-cta-left">
              <h2>Need {data.title}?</h2>
              <p>Speak with our team to discuss your vessel or project requirements.</p>
            </div>
            <div className="au-cta-right">
              <Link href="/contact" className="au-btn-primary">
                <i className="bi bi-envelope-fill"></i> Contact Us
              </Link>
              <Link href="/services" className="au-btn-outline">
                <i className="bi bi-grid"></i> All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
