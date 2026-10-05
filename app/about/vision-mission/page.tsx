import HeroInner from '@/components/sections/HeroInner';
import AosInit from '@/components/layout/AosInit';
import AnimatedBg from '@/components/layout/AnimatedBg';
import { fetchPageContent } from '@/lib/pageContent';

export const metadata = {
  title: 'Vision & Mission | SCM - Survey and Certification Malaysia',
  description: 'The vision, mission and core values that guide Ships Classification Malaysia in promoting safety of life at sea and protection of the marine environment.',
};

interface Point { icon: string; title: string; desc: string }
interface Value { icon: string; title: string; desc: string; color?: string }
interface Metric { icon: string; num: string; label: string }
interface VMContent {
  hero?: { label?: string; title?: string; desc?: string };
  vision?: { label?: string; title?: string; body?: string; highlight?: string };
  mission?: { label?: string; title?: string; intro?: string; points?: Point[] };
  values?: { tag?: string; title?: string; subtitle?: string; items?: Value[] };
  commitment?: { tag?: string; title?: string; body?: string; pills?: { label: string }[]; metrics?: Metric[] };
}

const FALLBACK = {
  hero: { label: 'Our Direction & Purpose', title: 'Vision & Mission', desc: 'The principles that guide Ships Classification Malaysia in promoting safety of life at sea and protection of the marine environment.' },
  vision: {
    label: 'Our Vision',
    title: 'To Become a Classification Society of Choice in Malaysia',
    body: '<p>As Malaysia\'s national premier Classification Society since 1994, SCM aspires to be the trusted authority for ship classification and statutory certification — recognised for technical excellence, integrity, and an unwavering commitment to maritime safety.</p><p>We envision a maritime industry where every Malaysian-registered vessel operates safely, efficiently, and in harmony with the marine environment.</p>',
    highlight: 'Promoting safety of life and property at sea.',
  },
  mission: {
    label: 'Our Mission',
    title: 'Advancing Maritime Safety & Quality',
    intro: 'To consistently enrich our resource capabilities by extending quality services for the safety of life and property at sea, protecting the marine environment, enhancing maritime security, and ensuring acceptable living conditions for seafarers.',
    points: [
      { icon: 'bi-clipboard-check', title: 'Classification & Surveys', desc: 'Conduct classification and statutory surveys on vessels throughout their lifecycle in line with SCM Rules and IMO conventions.' },
      { icon: 'bi-patch-check', title: 'Statutory Certification', desc: 'Issue classification and statutory certificates on behalf of the flag administration for Malaysian-registered ships.' },
      { icon: 'bi-water', title: 'Marine Environmental Protection', desc: 'Promote the protection and preservation of the marine environment through compliance with MARPOL and related conventions.' },
      { icon: 'bi-shield-check', title: 'Maritime Security', desc: 'Enhance the maritime security of ships and marine facilities through ISPS and related audits.' },
      { icon: 'bi-people', title: 'Seafarer Welfare', desc: 'Ensure acceptable living and working conditions for seafarers in accordance with the MLC 2006.' },
      { icon: 'bi-gear-wide-connected', title: 'Continuous Improvement', desc: 'Keep pace with technological advancement and digital survey practices to meet evolving industry and IMO requirements.' },
    ],
  },
  values: {
    tag: 'What We Stand For',
    title: 'Our Core Values',
    subtitle: 'The six principles that define how we serve the maritime industry.',
    items: [
      { icon: 'bi-gem', title: 'Quality', desc: 'We ensure the value of our work is always at the highest quality — in task completion, interactions, and deliverables.' },
      { icon: 'bi-people-fill', title: 'Teamwork', desc: 'We value the collaborative efforts of every team member to achieve a common goal efficiently.' },
      { icon: 'bi-shield-fill-check', title: 'Integrity', desc: 'We deliver our work with honesty and truthfulness, in line with our corporate business ethics.' },
      { icon: 'bi-hand-thumbs-up-fill', title: 'Safety', desc: 'We will not compromise on the safety of our people, our customers, and our workplace.' },
      { icon: 'bi-heart-fill', title: 'Respect', desc: 'We treat everyone honestly, fairly, and courteously in our business affairs and life.' },
      { icon: 'bi-globe2', title: 'Sustainability', desc: 'We act responsibly, always considering our impact on the people and environment in which we operate.' },
    ],
  },
  commitment: {
    tag: 'Our Commitment',
    title: 'Trusted by the Nation\'s Maritime Industry',
    body: '<p>Since 1994, SCM has been the first local Classification Society authorised by the Government of Malaysia to provide classification and statutory certification services for the major IMO conventions Malaysia is signatory to.</p><p>We serve Malaysian-registered ships, the Royal Malaysian Navy, training institutions, and other government agencies — always upholding our ISO 9001 quality management system and R.O. Code commitments.</p>',
    pills: [{ label: 'ISO 9001 QMS Certified' }, { label: 'R.O. Code Compliant' }, { label: 'Government Authorised' }, { label: 'Member of ACS' }],
    metrics: [
      { num: '1994', label: 'Established', icon: 'bi-calendar-check-fill' },
      { num: '1,000+', label: 'Vessels Classified', icon: 'bi-clipboard-check-fill' },
      { num: 'ISO 9001', label: 'QMS Certified', icon: 'bi-patch-check-fill' },
      { num: 'Nationwide', label: 'East & West Malaysia', icon: 'bi-geo-alt-fill' },
    ],
  },
};

export default async function VisionMissionPage() {
  const c = (await fetchPageContent<VMContent>('about/vision-mission')) || {};
  const hero = { ...FALLBACK.hero, ...(c.hero || {}) };
  const vision = { ...FALLBACK.vision, ...(c.vision || {}) };
  const mission = { ...FALLBACK.mission, ...(c.mission || {}) };
  const missionPoints = mission.points && mission.points.length > 0 ? mission.points : FALLBACK.mission.points;
  const values = { ...FALLBACK.values, ...(c.values || {}) };
  const valueItems = values.items && values.items.length > 0 ? values.items : FALLBACK.values.items;
  const commitment = { ...FALLBACK.commitment, ...(c.commitment || {}) };
  const pills = commitment.pills && commitment.pills.length > 0 ? commitment.pills : FALLBACK.commitment.pills;
  const metrics = commitment.metrics && commitment.metrics.length > 0 ? commitment.metrics : FALLBACK.commitment.metrics;

  return (
    <>
      <AosInit />
      <HeroInner
        title={hero.title || 'Vision & Mission'}
        image="/image/banner-about.jpg"
        crumbs={[{ label: 'About' }, { label: 'Vision & Mission' }]}
      />

      {/* Vision + Mission */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="icons" />
        <div className="container">
          <div className="row g-5 align-items-stretch">
            {/* Vision */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="vm-vision-card">
                <div className="vm-icon"><i className="bi bi-eye-fill"></i></div>
                <span className="vm-label">{vision.label}</span>
                <h2>{vision.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: vision.body || '' }} />
                {vision.highlight && <p className="vm-highlight">{vision.highlight}</p>}
              </div>
            </div>

            {/* Mission */}
            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="100">
              <span className="vm-label">{mission.label}</span>
              <h2 className="section-title text-start">{mission.title}</h2>
              <p className="vm-mission-intro">{mission.intro}</p>
              <div className="vm-points">
                {missionPoints.map((p) => (
                  <div className="vm-point" key={p.title}>
                    <i className={`bi ${p.icon}`}></i>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-light has-anim-bg">
        <AnimatedBg variant="rings" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{values.tag}</span>
            <h2 className="section-title">{values.title}</h2>
            <p className="section-subtitle">{values.subtitle}</p>
          </div>
          <div className="val-grid">
            {valueItems.map((v, i) => (
              <div className="val-card" key={v.title} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                <div className="val-icon"><i className={`bi ${v.icon}`}></i></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="waves" />
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="section-tag">{commitment.tag}</span>
              <h2 className="section-title text-start">{commitment.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: commitment.body || '' }} />
              <div className="vm-commit-pills">
                {pills.map((p) => (
                  <span className="vm-commit-pill" key={p.label}><i className="bi bi-check-circle-fill"></i> {p.label}</span>
                ))}
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
              <div className="vm-metrics">
                {metrics.map((m) => (
                  <div className="vm-metric" key={m.label}>
                    <i className={`bi ${m.icon}`}></i>
                    <div className="num">{m.num}</div>
                    <div className="lbl">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
