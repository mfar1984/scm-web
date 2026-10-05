import Link from 'next/link';

interface IntroCard { icon: string; title: string; text: string }
interface IntroData {
  welcomeLabel?: string;
  welcomeTitle?: string;
  welcomeLinkLabel?: string;
  welcomeLinkHref?: string;
  cards?: IntroCard[];
}

const fallbackCards: IntroCard[] = [
  {
    icon: 'bi-people',
    title: 'Who We Are',
    text: 'We are the national premier Classification Society in Malaysia since 1994. We are also a member of the Asian Classification Society (ACS).',
  },
  {
    icon: 'bi-clipboard-check',
    title: 'What We Do',
    text: 'We carry out both Classification and non-Classification works for vessels. We have classified more than 1,000 Malaysian registered vessels to date, and counting.',
  },
  {
    icon: 'bi-award',
    title: 'Why Choose Us',
    text: 'Everything we do is based on the highest standard of quality, delivered consistently and professionally to our valued customers.',
  },
];

export default function IntroSection({ data }: { data?: IntroData }) {
  const welcomeLabel = data?.welcomeLabel || 'Welcome to';
  const welcomeTitle = data?.welcomeTitle || 'Malaysia Premier Classification Society';
  const welcomeLinkLabel = data?.welcomeLinkLabel || 'About Us';
  const welcomeLinkHref = data?.welcomeLinkHref || '/about/about-us';
  const cards: IntroCard[] = data?.cards && data.cards.length > 0 ? data.cards : fallbackCards;

  return (
    <section id="intro" className="intro-section">
      <div className="container">
        <div className="row g-4 align-items-stretch">

          {/* Welcome card */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <div className="intro-welcome">
              <span className="intro-welcome-label">{welcomeLabel}</span>
              <h2 className="intro-welcome-title">{welcomeTitle}</h2>
              <Link href={welcomeLinkHref} className="intro-welcome-link">
                {welcomeLinkLabel} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Info cards */}
          {cards.map((card, i) => (
            <div className="col-lg-3 col-md-6" key={card.title} data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
              <div className="intro-card">
                <div className="intro-card-icon">
                  <i className={`bi ${card.icon}`}></i>
                </div>
                <h3 className="intro-card-title">{card.title}</h3>
                <p className="intro-card-text">{card.text}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
