'use client';

import { useState } from 'react';
import Link from 'next/link';
import { news, newsCategories } from '@/lib/newsData';

export default function NewsClient() {
  const [activeCat, setActiveCat] = useState('All');
  const cats = ['All', ...newsCategories.filter(c => news.some(n => n.category === c))];
  const filtered = activeCat === 'All' ? news : news.filter(n => n.category === activeCat);

  return (
    <>
      {/* HERO */}
      <section className="news-hero">
        <div className="news-hero-bg" />
        <div className="news-hero-particles" aria-hidden="true">
          {[...Array(10)].map((_, i) => <span key={i} className={`news-p news-p-${i + 1}`} />)}
        </div>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb-custom">
                  <li><Link href="/">Home</Link></li>
                  <li className="separator">›</li>
                  <li>News</li>
                </ol>
              </nav>
              <span className="news-hero-tag"><i className="bi bi-broadcast-pin"></i> SCM Newsroom</span>
              <h1 className="news-hero-title">Latest News &amp; Updates</h1>
              <p className="news-hero-desc">
                Stay informed with the latest maritime insights, company news and industry
                updates from Ships Classification Malaysia. Discover our milestones,
                technical guidance and contributions to the maritime industry.
              </p>
              <a href="#articles" className="au-btn-primary"><i className="bi bi-journal-text"></i> Browse Articles</a>
            </div>
            <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left" data-aos-delay="100">
              <div className="news-hero-visual">
                <div className="news-hero-card">
                  <span className="news-live"><span className="news-live-dot" /> LIVE</span>
                  <i className="bi bi-newspaper"></i>
                  <strong>SCM Newsroom</strong>
                  <span>{news.length} articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="section section-light" id="articles">
        <div className="container">
          {/* Category filter */}
          <div className="news-filter">
            {cats.map(c => (
              <button
                key={c}
                className={`news-filter-btn ${activeCat === c ? 'news-filter-active' : ''}`}
                onClick={() => setActiveCat(c)}
              >{c}</button>
            ))}
          </div>

          <div className="row g-4">
            {filtered.map((a, i) => (
              <div className="col-lg-4 col-md-6" key={a.slug}>
                <Link href={`/news/${a.slug}`} className="news-card" data-aos="fade-up" data-aos-delay={`${(i % 3) * 80}`}>
                  <div className="news-card-media" style={{ backgroundImage: `url(${a.image})` }}>
                    <span className="news-card-cat">{a.category}</span>
                  </div>
                  <div className="news-card-body">
                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <div className="news-card-meta">
                      <span><i className="bi bi-person"></i> {a.author}</span>
                      <span><i className="bi bi-calendar3"></i> {a.date}</span>
                    </div>
                    <div className="news-card-foot">
                      <span className="news-readmore">Read More <i className="bi bi-arrow-right"></i></span>
                      <span className="news-readtime"><i className="bi bi-clock"></i> {a.readTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>No articles in this category yet.</div>
          )}
        </div>
      </section>
    </>
  );
}
