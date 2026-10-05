import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

interface HeroInnerProps {
  title: string;
  image: string;
  crumbs?: Crumb[];
}

export default function HeroInner({ title, image, crumbs = [] }: HeroInnerProps) {
  return (
    <section className="hero-inner" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-inner-overlay" />
      {/* Rising bubble particles (maritime theme) */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`bubble bubble-${i + 1}`} />
        ))}
      </div>
      <div className="container">
        <div className="hero-inner-content" data-aos="fade-up">
          <h1>{title}</h1>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb-custom">
              <li><Link href="/">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={i}>
                  <span className="separator">/</span>
                  {c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
