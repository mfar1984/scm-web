import HeroInner from '@/components/sections/HeroInner';
import AosInit from '@/components/layout/AosInit';
import AnimatedBg from '@/components/layout/AnimatedBg';
import { Highlight } from '@/components/layout/Highlight';
import { fetchPageContent } from '@/lib/pageContent';

export const metadata = {
  title: 'Certifications & Compliance | SCM - Survey and Certification Malaysia',
  description: 'SCM is ISO 9001 certified, R.O. Code compliant, and authorised by the Government of Malaysia to deliver classification and statutory certification services aligned with IMO conventions.',
};

interface Cert { name: string; code: string; status: string; year?: string; desc: string }
interface Category { icon: string; title: string; desc: string; color?: string; certs?: Cert[] }
interface Stat { icon: string; value: string; label: string }
interface CertContent {
  hero?: { label?: string; title?: string; desc?: string };
  stats?: { items?: Stat[] };
  categories?: { items?: Category[] };
  trust?: { title?: string; body?: string; checks?: { text: string }[] };
}

const FALLBACK = {
  hero: {
    label: 'Verified & Compliant',
    title: 'Certifications & **Compliance**',
    desc: 'SCM operates under rigorous quality and regulatory frameworks — ISO 9001 certified, R.O. Code compliant, and authorised by the Government of Malaysia to deliver classification and statutory certification services.',
  },
  stats: [
    { value: 'ISO 9001', label: 'QMS Certified', icon: 'bi-patch-check' },
    { value: 'R.O. Code', label: 'Compliant', icon: 'bi-shield-check' },
    { value: '1,000+', label: 'Vessels Classified', icon: 'bi-clipboard-check' },
    { value: '1994', label: 'Serving Since', icon: 'bi-calendar-check' },
  ] as Stat[],
  categories: [
    {
      icon: 'bi-award-fill', title: 'Quality & Management System', color: 'cert-navy',
      desc: 'Internationally recognised quality standards governing every aspect of our operations.',
      certs: [
        { name: 'ISO 9001:2015 Quality Management System', code: 'ISO 9001', status: 'Certified', year: '', desc: 'Certified quality management system ensuring consistent, high-quality classification and certification services.' },
        { name: 'Recognised Organization (R.O.) Code', code: 'R.O. Code', status: 'Compliant', year: '', desc: 'Compliance with the IMO R.O. Code governing organisations authorised to act on behalf of flag administrations.' },
      ],
    },
    {
      icon: 'bi-bank2', title: 'Statutory Authorisation', color: 'cert-blue',
      desc: 'Official authorisation to act on behalf of the Government of Malaysia.',
      certs: [
        { name: 'Government of Malaysia Authorisation', code: 'Flag State', status: 'Active', year: '1994', desc: 'First local Classification Society authorised to provide classification and statutory certification for Malaysian-registered ships.' },
        { name: 'Marine Department Malaysia (JLM)', code: 'Delegated', status: 'Active', year: '1994', desc: 'Delegated authority to conduct statutory surveys and certification on behalf of the flag administration.' },
      ],
    },
    {
      icon: 'bi-globe2', title: 'International Conventions', color: 'cert-teal',
      desc: 'Surveys and certification aligned with the major IMO conventions Malaysia is signatory to.',
      certs: [
        { name: 'SOLAS — Safety of Life at Sea', code: 'SOLAS', status: 'Compliant', year: '', desc: 'Cargo Ship Safety Construction, Equipment, and Radio certification under the SOLAS Convention.' },
        { name: 'MARPOL — Marine Pollution', code: 'MARPOL', status: 'Compliant', year: '', desc: 'IOPP and IAPP certification for the prevention of pollution from ships.' },
        { name: 'International Load Line Convention 1966', code: 'ILLC 1966', status: 'Compliant', year: '', desc: 'Load line survey and certification ensuring safe freeboard and stability.' },
        { name: 'International Tonnage Convention 1969', code: 'ITC 1969', status: 'Compliant', year: '', desc: 'Tonnage measurement and certification of vessels.' },
      ],
    },
    {
      icon: 'bi-shield-fill-check', title: 'Codes & Standards', color: 'cert-green',
      desc: 'Management and security codes governing safe ship operation.',
      certs: [
        { name: 'International Safety Management (ISM) Code', code: 'ISM Code', status: 'Compliant', year: '', desc: 'Audit and certification of safety management systems for ships and companies.' },
        { name: 'International Ship & Port Facility Security (ISPS) Code', code: 'ISPS Code', status: 'Compliant', year: '', desc: 'Ship and port facility security assessments, plans, and audits.' },
        { name: 'Maritime Labour Convention (MLC) 2006', code: 'MLC 2006', status: 'Compliant', year: '', desc: 'Inspection and certification ensuring decent working and living conditions for seafarers.' },
      ],
    },
  ] as Category[],
  trust: {
    title: 'Why Our Certifications Matter',
    body: '<p>As Malaysia\'s national premier Classification Society, SCM\'s authority is backed by government authorisation, international recognition, and a certified quality management system. Ship owners, operators, and flag administrations trust SCM to uphold the highest standards of maritime safety.</p><p>Our ISO 9001 certification and R.O. Code compliance ensure that every survey, audit, and certificate we issue meets rigorous, internationally accepted criteria.</p>',
    checks: [
      { text: 'ISO 9001:2015 certified quality management system' },
      { text: 'Compliant with the IMO Recognised Organization (R.O.) Code' },
      { text: 'Authorised by the Government of Malaysia since 1994' },
      { text: 'Surveys aligned with SOLAS, MARPOL, Load Line & Tonnage' },
      { text: 'ISM, ISPS & MLC audit and certification capability' },
      { text: 'Member of the Asian Classification Society (ACS)' },
    ],
  },
};

export default async function CertificationsPage() {
  const c = (await fetchPageContent<CertContent>('about/certifications')) || {};
  const hero = { ...FALLBACK.hero, ...(c.hero || {}) };
  const stats = c.stats?.items && c.stats.items.length > 0 ? c.stats.items : FALLBACK.stats;
  const categories = c.categories?.items && c.categories.items.length > 0 ? c.categories.items : FALLBACK.categories;
  const trust = { ...FALLBACK.trust, ...(c.trust || {}) };
  const checks = trust.checks && trust.checks.length > 0 ? trust.checks : FALLBACK.trust.checks;

  return (
    <>
      <AosInit />
      <HeroInner
        title="Certifications"
        image="/image/banner-about.jpg"
        crumbs={[{ label: 'About' }, { label: 'Certifications' }]}
      />

      {/* Stats strip */}
      <section className="section section-white has-anim-bg" style={{ paddingBottom: 0 }}>
        <AnimatedBg variant="icons" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{hero.label}</span>
            <h2 className="section-title"><Highlight text={hero.title} /></h2>
            <p className="section-subtitle">{hero.desc}</p>
          </div>
          <div className="certp-stats">
            {stats.map((s) => (
              <div className="certp-stat" key={s.label}>
                <i className={`bi ${s.icon}`}></i>
                <div className="num">{s.value}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="grid" />
        <div className="container">
          <div className="row g-4">
            {categories.map((cat, i) => (
              <div className="col-lg-6" key={cat.title} data-aos="fade-up" data-aos-delay={(i % 2) * 100}>
                <div className={`certp-cat ${cat.color || 'cert-blue'}`}>
                  <div className="certp-cat-head">
                    <div className="certp-cat-icon"><i className={`bi ${cat.icon}`}></i></div>
                    <div>
                      <h3>{cat.title}</h3>
                      <p>{cat.desc}</p>
                    </div>
                  </div>
                  <div className="certp-cert-list">
                    {(cat.certs || []).map((ct) => (
                      <div className="certp-cert" key={ct.name}>
                        <div className="certp-cert-top">
                          <span className="certp-cert-name">{ct.name}</span>
                          <span className={`certp-badge ${ct.status.toLowerCase()}`}>{ct.status}</span>
                        </div>
                        <div className="certp-cert-meta">{ct.code}{ct.year ? ` · ${ct.year}` : ''}</div>
                        <p>{ct.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust statement */}
      <section className="section section-light has-anim-bg">
        <AnimatedBg variant="waves" />
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="section-tag">Trust & Assurance</span>
              <h2 className="section-title text-start">{trust.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: trust.body || '' }} />
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
              <ul className="certp-trust-checks">
                {checks.map((ch) => (
                  <li key={ch.text}><i className="bi bi-check-circle-fill"></i> {ch.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
