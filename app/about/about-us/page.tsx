import HeroInner from '@/components/sections/HeroInner';
import AosInit from '@/components/layout/AosInit';
import AnimatedBg from '@/components/layout/AnimatedBg';
import { Highlight } from '@/components/layout/Highlight';
import { fetchPageContent } from '@/lib/pageContent';

export const metadata = {
  title: 'About Us | SCM - Survey and Certification Malaysia',
  description: 'Ships Classification Malaysia (SCM) was established in 1994 as Malaysia\'s national premier Classification Society, promoting safety of life at sea and marine environmental protection.',
};

interface AboutContent {
  hero?: { title?: string; image?: string };
  overview?: { image?: string; badgeNumber?: string; badgeText?: string; tag?: string; title?: string; body?: string };
  mission?: { bgImage?: string; title?: string; text?: string; values?: { label: string }[] };
  ethicsVision?: { ethicsTitle?: string; ethicsBody?: string; visionTitle?: string; visionBody?: string };
  mdMessage?: { tag?: string; title?: string; body?: string };
  quality?: { image?: string; tag?: string; title?: string; body?: string };
}

const FALLBACK = {
  hero: { title: 'About Us', image: '/image/banner-about.jpg' },
  overview: {
    image: '/image/core-value.jpg',
    badgeNumber: '28',
    badgeText: 'Years of Establishment',
    tag: 'Corporate Overview',
    title: "Let's grow together",
    body: '<p>Ships Classification Malaysia Sdn. Bhd. (SCM) was established in 1994, near Kuala Lumpur, Malaysia, inspired by the awareness between local professionals and entrepreneurs that the need for a Classification Society is clearly evident considering the development in our maritime industry.</p><p>In addition to its headquarters, SCM had established operation offices in East and West Malaysia to effectively cater to its customers in both Classification and non-Classification of ships.</p><p>Since its inception as a national Classification Society, SCM has continuously been promoting safety of life at sea and marine environmental protection. SCM is also an ISO 9001 QMS certified and R.O. Code compliant company. SCM confines the classification activities largely to Malaysian-registered ships and continues to grow and serve the nation with pride.</p>',
  },
  mission: {
    bgImage: '/image/bg-our-mission.jpg',
    title: 'Our Mission',
    text: 'To consistently enrich our resource capabilities by extending quality of services for the safety of life and property at sea, promoting the protection of the marine environment, enhancing maritime security of ships and ensuring acceptable living conditions for seafarers.',
    values: [
      { label: 'Quality' }, { label: 'Teamwork' }, { label: 'Integrity' },
      { label: 'Safety' }, { label: 'Respect' }, { label: 'Sustainability' },
    ],
  },
  ethicsVision: {
    ethicsTitle: 'Code of **Ethics**',
    ethicsBody: 'Our people always uphold our Code of Ethics while performing their work — they shall be free from any pressures which might affect their judgment in performing statutory certification and services. Any decisions made with regard to the technical services rendered by SCM will not be influenced by external sources.',
    visionTitle: 'Our Vision',
    visionBody: 'To become a classification society of choice in Malaysia.',
  },
  mdMessage: {
    tag: 'Leadership',
    title: 'Message from the Managing Director',
    body: '<p>Malaysia, as an emerging economy, had experienced a huge expansion of the maritime transportation sector between East Malaysia, West Malaysia, and the ASEAN region. It was this expansion that inspired the formation of a local classification society to provide classification and statutory certification services for Malaysian registered ships.</p><p>Founded in 1994 with the objective of providing support to the maritime industry, SCM is the first local Classification Society to obtain authorization from the Government of Malaysia to provide Classification and statutory certification services for all the major IMO conventions that Malaysia is signatory to.</p><p>Presently, SCM not only conducts surveys and inspections for classification of ships and other floating structures, we also provide inspection and certification services to vessels owned and operated by the Malaysian Royal Navy and training institutions, and carry out inspections on behalf of other Government agencies.</p>',
  },
  quality: {
    image: '/image/quality-policy.jpg',
    tag: 'Our Commitment',
    title: 'Quality Policy',
    body: '<p>Being a premier national classification body, Ships Classification Malaysia is fully committed to providing quality services for safety of life and property at sea, promoting the protection and preservation of the marine environment, enhancing maritime security of ships and ensuring acceptable living conditions for seafarers.</p><p>SCM observes the relevant international conventions, codes, national laws, standards and other regulatory and statutory guidelines, in addition to its own rules and regulations, in providing quality services to its clients and interested parties.</p><p>SCM has established a documented quality management system to meet these requirements appropriately and efficiently by clarifying responsibilities and authority relating to quality to all employees, whose performance is continuously improved through planning, assurance, training and management review.</p><p>SCM keeps pace with the latest technologies and developments in the digital revolution and survey perspectives, in line with technological advancement and the changes required to meet the reduction in GHG emissions in accordance with the aspirations of our government and the IMO.</p>',
  },
};

export default async function AboutUsPage() {
  const c = (await fetchPageContent<AboutContent>('about/about-us')) || {};
  const hero = { ...FALLBACK.hero, ...(c.hero || {}) };
  const overview = { ...FALLBACK.overview, ...(c.overview || {}) };
  const mission = { ...FALLBACK.mission, ...(c.mission || {}) };
  const missionValues = mission.values && mission.values.length > 0 ? mission.values : FALLBACK.mission.values;
  const ethicsVision = { ...FALLBACK.ethicsVision, ...(c.ethicsVision || {}) };
  const mdMessage = { ...FALLBACK.mdMessage, ...(c.mdMessage || {}) };
  const quality = { ...FALLBACK.quality, ...(c.quality || {}) };

  return (
    <>
      <AosInit />
      <HeroInner
        title={hero.title}
        image={hero.image}
        crumbs={[{ label: 'About' }, { label: 'About Us' }]}
      />

      {/* Corporate Overview */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="icons" />
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={overview.image} alt="SCM corporate overview" />
                <div className="about-figure-badge">
                  <span className="num">{overview.badgeNumber}</span>
                  <span className="txt" dangerouslySetInnerHTML={{ __html: (overview.badgeText || '').replace(/ (\S+)$/, '<br />$1') }} />
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
              <span className="section-tag">{overview.tag}</span>
              <h2 className="section-title text-start">{overview.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: overview.body || '' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission (with background) */}
      <section className="mission-section" style={{ backgroundImage: `url('${mission.bgImage}')` }}>
        <div className="mission-overlay" />
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="mission-title">{mission.title}</h2>
            </div>
            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="100">
              <p className="mission-text">{mission.text}</p>
              <div className="mission-values">
                {missionValues.map((v) => (
                  <span className="mission-chip" key={v.label}><i className="bi bi-check-circle-fill"></i> {v.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Ethics + Vision */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="rings" />
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7" data-aos="fade-up">
              <div className="info-card info-card-light">
                <div className="info-card-icon"><i className="bi bi-shield-lock"></i></div>
                <h3><Highlight text={ethicsVision.ethicsTitle} /></h3>
                <p>{ethicsVision.ethicsBody}</p>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-up" data-aos-delay="100">
              <div className="info-card info-card-dark">
                <div className="info-card-icon"><i className="bi bi-eye"></i></div>
                <h3><Highlight text={ethicsVision.visionTitle} /></h3>
                <p>{ethicsVision.visionBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from the Managing Director */}
      <section className="section section-light has-anim-bg">
        <AnimatedBg variant="grid" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{mdMessage.tag}</span>
            <h2 className="section-title">{mdMessage.title}</h2>
          </div>
          <div className="md-message" data-aos="fade-up" dangerouslySetInnerHTML={{ __html: mdMessage.body || '' }} />
        </div>
      </section>

      {/* Quality Policy */}
      <section className="section section-white has-anim-bg">
        <AnimatedBg variant="waves" />
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="quality-figure" style={{ backgroundImage: `url('${quality.image}')` }} />
            </div>
            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="100">
              <span className="section-tag">{quality.tag}</span>
              <h2 className="section-title text-start">{quality.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: quality.body || '' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
