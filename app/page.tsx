import HeroSection from '@/components/sections/HeroSection';
import IntroSection from '@/components/sections/IntroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesHome from '@/components/sections/ServicesHome';
import ValuesSection from '@/components/sections/ValuesSection';
import AosInit from '@/components/layout/AosInit';
import { fetchPageContent } from '@/lib/pageContent';

export const metadata = {
  title: 'Malaysia Premier Classification Society | SCM',
  description: 'SCM is Malaysia\'s national premier Classification Society since 1994. We provide classification, certification, and consultancy services for the maritime industry.',
};

interface HomeContent {
  hero?: Record<string, unknown>;
  intro?: Record<string, unknown>;
  stats?: Record<string, unknown>;
  services?: Record<string, unknown>;
  values?: Record<string, unknown>;
  compromise?: Record<string, unknown>;
}

export default async function HomePage() {
  const content = (await fetchPageContent<HomeContent>('home')) || {};

  return (
    <>
      <AosInit />
      <HeroSection data={content.hero as never} />
      <div className="home-screen-two">
        {/* Decorative slow-spinning world globe (right side) */}
        <div className="globe-bg" aria-hidden="true">
          <div className="globe-sphere">
            <div className="globe-map" />
            <div className="globe-shade" />
          </div>
        </div>

        {/* Decorative animation to fill the left side */}
        <div className="home-deco" aria-hidden="true">
          {/* Sonar / radar pulse */}
          <div className="deco-radar">
            <span /><span /><span />
          </div>
          {/* Floating particles */}
          <div className="deco-dots">
            {[
              { left: '5%', top: '28%', s: 9, d: '0s', dur: '7s' },
              { left: '13%', top: '60%', s: 5, d: '1.2s', dur: '9s' },
              { left: '3%', top: '74%', s: 12, d: '.6s', dur: '8s' },
              { left: '19%', top: '20%', s: 6, d: '2s', dur: '10s' },
              { left: '23%', top: '82%', s: 7, d: '.3s', dur: '7.5s' },
              { left: '9%', top: '46%', s: 4, d: '1.6s', dur: '8.5s' },
              { left: '27%', top: '52%', s: 5, d: '2.4s', dur: '9.5s' },
            ].map((p, i) => (
              <span
                key={i}
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.s,
                  height: p.s,
                  animationDelay: p.d,
                  animationDuration: p.dur,
                }}
              />
            ))}
          </div>
        </div>
        <IntroSection data={content.intro as never} />
        <div className="screen-divider">
          <span className="line"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>
        <StatsSection data={content.stats as never} />
      </div>
      <ServicesHome data={content.services as never} />
      <ValuesSection core={content.values as never} compromise={content.compromise as never} />
    </>
  );
}
