import Link from 'next/link';
import HeroInner from '@/components/sections/HeroInner';
import AnimatedBg from '@/components/layout/AnimatedBg';
import { serviceList } from '@/lib/servicesData';

type Crumb = { label: string; href?: string };

export default function ServicesShowcase({
  title = 'Our Services',
  heroImage = '/image/survey-inspection-min.png',
  crumbs = [{ label: 'Services' }],
}: {
  title?: string;
  heroImage?: string;
  crumbs?: Crumb[];
}) {
  return (
    <>
      <HeroInner title={title} image={heroImage} crumbs={crumbs} />

      {serviceList.map((s, idx) => {
        const flip = idx % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`section svc-block has-anim-bg ${flip ? 'section-dark' : 'section-white'}`}
          >
            <AnimatedBg variant={idx % 3 === 0 ? 'rings' : idx % 3 === 1 ? 'grid' : 'waves'} />
            <div className="container">
              <div className={`row align-items-center g-5 ${flip ? 'flex-lg-row-reverse' : ''}`}>
                <div className="col-lg-7" data-aos={flip ? 'fade-left' : 'fade-right'}>
                  <div className="svc-overview">
                    <span className="svc-number">{s.number}</span>
                    <span className="section-tag">{s.tag}</span>
                    <h2 className="section-title text-start">{s.title}</h2>
                    <p>{s.intro}</p>
                    <ul className="svc-list">
                      {s.offerings.map((item, i) => (
                        <li key={i}>
                          <span className="svc-list-check"><i className="bi bi-check-lg"></i></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="au-btn-primary" style={{ marginTop: 8 }}>
                      <i className="bi bi-send-fill"></i> Enquire Now
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5" data-aos={flip ? 'fade-right' : 'fade-left'} data-aos-delay="100">
                  <div className="svc-figure">
                    <span className="svc-figure-circle" />
                    <img src={s.image} alt={s.title} />
                    <div className="svc-figure-icon"><i className={`bi ${s.icon}`}></i></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

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
