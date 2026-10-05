'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem { icon: string; value: number; suffix: string; label: string }
interface StatsData { brandImage?: string; items?: { icon: string; value: string | number; suffix?: string; label: string }[] }

const fallbackStats: StatItem[] = [
  { icon: 'bi-emoji-smile-fill', value: 300, suffix: '+', label: 'Satisfied Clients' },
  { icon: 'bi-patch-check-fill', value: 100, suffix: '%', label: 'Quality Control System' },
  { icon: 'bi-award-fill', value: 100, suffix: '%', label: 'Professional & Qualified' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-number" ref={ref}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection({ data }: { data?: StatsData }) {
  const brandImage = data?.brandImage || '/image/scm-min.png';
  const stats: StatItem[] =
    data?.items && data.items.length > 0
      ? data.items.map((s) => ({
          icon: s.icon,
          value: Number(s.value) || 0,
          suffix: s.suffix || '',
          label: s.label,
        }))
      : fallbackStats;

  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-brand" data-aos="zoom-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandImage} alt="SCM" className="stats-brand-img" />
        </div>

        <div className="stats-panel" data-aos="fade-up">
          {stats.map((stat, i) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-icon"><i className={`bi ${stat.icon}`}></i></div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <div className="stat-caption">{stat.label}</div>
              {i < stats.length - 1 && <span className="stat-sep" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
