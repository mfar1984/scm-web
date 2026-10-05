'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getBackendApiUrl } from '@/lib/runtime-config';

const BASE = getBackendApiUrl();

type Photo = { id: number; caption: string | null; detail: string | null; demoSrc?: string };
type Album = {
  id: number; title: string; subtitle: string | null; category: string;
  year: string | null; description: string | null; has_cover: number | boolean;
  photo_count: number; photos: Photo[]; demoCover?: string;
};

const catIcon: Record<string, string> = {
  Surveys: 'bi-clipboard-check', Inspection: 'bi-search', Events: 'bi-calendar-event',
  Team: 'bi-people-fill', Training: 'bi-mortarboard', Facilities: 'bi-building',
  Projects: 'bi-folder2-open', Ceremony: 'bi-award',
};
const catDesc: Record<string, string> = {
  Surveys: 'Classification and statutory surveys carried out on vessels.',
  Events: 'Maritime events, ceremonies and industry engagements.',
  Team: 'Our surveyors, engineers and staff at work.',
  Training: 'Workshops, courses and professional development.',
  Facilities: 'Our headquarters, offices and workspace.',
};

// ── DEMO preview data — replaced automatically by live backend albums.
const DEMO_ALBUMS: Album[] = [
  {
    id: -1, title: 'Vessel Classification Surveys', subtitle: 'Port Klang, Selangor',
    category: 'Surveys', year: '2026',
    description: 'A look at our surveyors conducting classification and statutory surveys aboard Malaysian-registered vessels.',
    has_cover: 1, demoCover: '/image/Slider1.jpg',
    photo_count: 3,
    photos: [
      { id: -101, caption: 'Hull inspection', detail: 'Verifying structural compliance with SCM Rules.', demoSrc: '/image/Slider1.jpg' },
      { id: -102, caption: 'On-site survey', detail: 'Field assessment of onboard systems.', demoSrc: '/image/core-value.jpg' },
      { id: -103, caption: 'Documentation review', detail: 'Checking certificates and records.', demoSrc: '/image/quality-policy.jpg' },
    ],
  },
  {
    id: -2, title: 'Maritime Events & Ceremonies', subtitle: 'Kuala Lumpur',
    category: 'Events', year: '2026',
    description: 'Highlights from industry conferences, partner engagements and company milestones.',
    has_cover: 1, demoCover: '/image/banner-about.jpg',
    photo_count: 2,
    photos: [
      { id: -201, caption: 'Industry conference', detail: null, demoSrc: '/image/banner-about.jpg' },
      { id: -202, caption: 'Partner engagement', detail: null, demoSrc: '/image/bg-compromise-on.jpg' },
    ],
  },
  {
    id: -3, title: 'Our Team at Work', subtitle: 'Shah Alam HQ',
    category: 'Team', year: '2026',
    description: 'The people behind SCM — collaboration, expertise and dedication in action.',
    has_cover: 1, demoCover: '/image/core-value.jpg',
    photo_count: 3,
    photos: [
      { id: -301, caption: 'Team briefing', detail: null, demoSrc: '/image/core-value.jpg' },
      { id: -302, caption: 'Quality review', detail: null, demoSrc: '/image/quality-policy.jpg' },
      { id: -303, caption: 'Field operations', detail: null, demoSrc: '/image/Slider2.jpg' },
    ],
  },
];

const coverUrl = (a: Album) => a.demoCover ?? `${BASE}/api/public/gallery/cover/${a.id}`;
const photoUrl = (p: Photo) => p.demoSrc ?? `${BASE}/api/public/gallery/photo/${p.id}`;

type ModalMode = 'info' | 'photos';

export default function GalleryClient() {
  const [albums, setAlbums] = useState<Album[]>(DEMO_ALBUMS);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [openItem, setOpenItem] = useState<Album | null>(null);
  const [mode, setMode] = useState<ModalMode>('info');
  const [selPhoto, setSelPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetch(`${BASE}/api/public/gallery`)
      .then(r => r.json())
      .then(j => { if (j.success && Array.isArray(j.data) && j.data.length > 0) setAlbums(j.data); })
      .catch(() => { /* backend offline — keep demo preview */ })
      .finally(() => setLoading(false));
  }, []);

  // Categories discovered dynamically from the albums themselves
  const usedCats = useMemo(
    () => Array.from(new Set(albums.map(a => a.category).filter(Boolean))),
    [albums]
  );
  const cats = ['All', ...usedCats];

  const filtered = activeFilter === 'All' ? albums : albums.filter(i => i.category === activeFilter);
  const totalPhotos = albums.reduce((n, a) => n + (a.photo_count || 0), 0);

  const openModal = (item: Album) => { setOpenItem(item); setMode('info'); setSelPhoto(null); };
  const closeModal = () => { setOpenItem(null); setMode('info'); setSelPhoto(null); };

  return (
    <>
      {/* ── HERO (animated mosaic) ── */}
      <section className="gal-hero">
        <div className="gal-hero-bg"></div>
        <div className="gal-mosaic">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`gal-tile gal-tile-${i + 1}`}></div>
          ))}
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb-custom" style={{ justifyContent: 'center' }}>
                  <li><Link href="/">Home</Link></li>
                  <li className="separator">›</li>
                  <li>Gallery</li>
                </ol>
              </nav>
              <span className="gal-hero-tag">
                <i className="bi bi-images"></i>
                Photo Gallery
              </span>
              <h1 className="gal-hero-title">
                Our Work, Our Team,<br />
                <span>Our Story</span>
              </h1>
              <p className="gal-hero-desc">
                A visual journey through SCM&apos;s surveys, maritime events, and the people
                who uphold safety at sea. Browse the albums by category and click any album
                to view its full photo collection.
              </p>
              <div className="gal-hero-counts">
                {[
                  { num: String(albums.length), label: 'Albums' },
                  { num: `${totalPhotos}`, label: 'Photos' },
                  { num: String(usedCats.length), label: 'Categories' },
                ].map(c => (
                  <div key={c.label} className="gal-hero-count">
                    <strong>{c.num}</strong>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section gal-main-section">
        <div className="container">

          {/* Filter */}
          <div className="gal-filter-wrap">
            {cats.map(cat => (
              <button
                key={cat}
                className={`gal-filter-btn ${activeFilter === cat ? 'gal-filter-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="gal-filter-count">
                    {albums.filter(i => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}><div className="spinner-border spinner-border-sm me-2"></div> Loading gallery…</div>
          ) : (
            <>
              <p className="gal-result-count">
                Showing <strong>{filtered.length}</strong> album{filtered.length !== 1 ? 's' : ''}
                {activeFilter !== 'All' ? ` in ${activeFilter}` : ''} · Click to view photos
              </p>

              {/* Grid */}
              <div className="gal-grid">
                {filtered.map(item => (
                  <div key={item.id} className="gal-item">
                    <div
                      className="gal-card"
                      style={{ '--gal-color': '#0052cc' } as React.CSSProperties}
                      onClick={() => openModal(item)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${item.title} gallery`}
                      onKeyDown={e => e.key === 'Enter' && openModal(item)}
                    >
                      {item.has_cover
                        ? <img className="gal-card-img" src={coverUrl(item)} alt={item.title} loading="lazy" />
                        : <div className="gal-card-icon-bg"><i className="bi bi-images"></i></div>}
                      <div className="gal-photo-badge">
                        <i className="bi bi-images"></i>
                        {item.photo_count} photos
                      </div>
                      <div className="gal-card-overlay">
                        <span className="gal-cat-pill">{item.category}</span>
                        <h3>{item.title}</h3>
                        {item.subtitle && <p>{item.subtitle}</p>}
                        <div className="gal-view-trigger">
                          <i className="bi bi-collection-fill"></i>
                          <span>View {item.photo_count} Photos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="gal-empty">
                  <i className="bi bi-images"></i>
                  <p>No albums in this category yet.</p>
                </div>
              )}

              {/* Category cards */}
              {usedCats.length > 0 && (
                <div className="gal-cat-summary">
                  <h2>Browse by Category</h2>
                  <div className="row g-4">
                    {usedCats.map(cat => (
                      <div className="col-lg-3 col-md-6" key={cat}>
                        <button
                          className={`gal-cat-card ${activeFilter === cat ? 'gal-cat-active' : ''}`}
                          onClick={() => { setActiveFilter(cat); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                          <div className="gal-cat-icon-wrap">
                            <i className={`bi ${catIcon[cat] || 'bi-folder2-open'}`}></i>
                          </div>
                          <h3>{cat}</h3>
                          <span className="gal-cat-count">{albums.filter(a => a.category === cat).length} albums</span>
                          <p>{catDesc[cat] || 'Explore this collection.'}</p>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-white">
        <div className="container">
          <div className="au-cta-box">
            <div className="au-cta-left">
              <h2>Want to Know More About Our Work?</h2>
              <p>Get in touch to learn about our classification, certification and consultancy services.</p>
            </div>
            <div className="au-cta-right">
              <Link href="/contact" className="au-btn-primary">
                <i className="bi bi-envelope-fill"></i> Get In Touch
              </Link>
              <Link href="/services" className="au-btn-outline">
                <i className="bi bi-folder2-open"></i> Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MODAL ══════════ */}
      {openItem && (
        <div className="gal-lb-overlay" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="gal-lb-modal">
            <button className="gal-lb-close" onClick={closeModal} aria-label="Close">
              <i className="bi bi-x-lg"></i>
            </button>

            {/* MODE 1: Info */}
            {mode === 'info' && (
              <div className="gal-lb-info-view">
                <div className="gal-lb-image" style={{ '--gal-color': '#0052cc' } as React.CSSProperties}>
                  {openItem.has_cover
                    ? <img className="gal-lb-cover" src={coverUrl(openItem)} alt={openItem.title} />
                    : <div className="gal-lb-icon-bg"><i className="bi bi-images"></i></div>}
                  {openItem.year && <span className="gal-lb-year-badge">{openItem.year}</span>}
                  <span className="gal-lb-photo-count-badge">
                    <i className="bi bi-images"></i>
                    {openItem.photo_count} photos
                  </span>
                </div>

                <div className="gal-lb-info">
                  <div className="gal-lb-header">
                    <span className="gal-lb-cat">{openItem.category}</span>
                    <h2>{openItem.title}</h2>
                    {openItem.subtitle && (
                      <p className="gal-lb-sub">
                        <i className="bi bi-geo-alt-fill"></i>
                        {openItem.subtitle}
                      </p>
                    )}
                  </div>

                  {openItem.description && <p className="gal-lb-desc">{openItem.description}</p>}

                  {openItem.photos.length > 0 && (
                    <div className="gal-lb-preview-strip">
                      {openItem.photos.slice(0, 4).map(p => (
                        <div key={p.id} className="gal-lb-preview-thumb" onClick={() => setMode('photos')}>
                          <img src={photoUrl(p)} alt={p.caption || ''} loading="lazy" />
                        </div>
                      ))}
                      {openItem.photos.length > 4 && (
                        <div className="gal-lb-preview-more" onClick={() => setMode('photos')}>
                          <i className="bi bi-plus-circle"></i>
                          <span>+{openItem.photos.length - 4} more</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="gal-lb-footer">
                    {openItem.photos.length > 0 && (
                      <button className="gal-lb-btn-primary" onClick={() => setMode('photos')}>
                        <i className="bi bi-collection-fill"></i>
                        View All {openItem.photo_count} Photos
                      </button>
                    )}
                    <Link href="/contact" className="gal-lb-btn-ghost" onClick={closeModal}>
                      <i className="bi bi-chat-dots"></i> Enquire
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: Photos grid */}
            {mode === 'photos' && !selPhoto && (
              <div className="gal-lb-photos-view">
                <div className="gal-lb-photos-header">
                  <button className="gal-lb-back" onClick={() => setMode('info')}>
                    <i className="bi bi-arrow-left"></i> Back
                  </button>
                  <div className="gal-lb-photos-title">
                    <span className="gal-lb-cat" style={{ display: 'inline-block', marginBottom: 2 }}>{openItem.category}</span>
                    <h3>{openItem.title}</h3>
                  </div>
                  <span className="gal-lb-count-badge">{openItem.photo_count} photos</span>
                </div>

                <div className="gal-lb-photos-grid">
                  {openItem.photos.map(photo => (
                    <div
                      key={photo.id}
                      className="gal-lb-photo-thumb"
                      onClick={() => setSelPhoto(photo)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${photo.caption || 'photo'}`}
                      onKeyDown={e => e.key === 'Enter' && setSelPhoto(photo)}
                    >
                      <img src={photoUrl(photo)} alt={photo.caption || ''} loading="lazy" />
                      {photo.caption && (
                        <div className="gal-lb-photo-caption">
                          <span>{photo.caption}</span>
                          <i className="bi bi-arrows-fullscreen"></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODE 3: Single photo */}
            {mode === 'photos' && selPhoto && (
              <div className="gal-lb-single-view">
                <div className="gal-lb-single-img">
                  <img src={photoUrl(selPhoto)} alt={selPhoto.caption || ''} />
                  <button
                    className="gal-lb-nav gal-lb-prev"
                    onClick={() => {
                      const idx = openItem.photos.findIndex(p => p.id === selPhoto.id);
                      if (idx > 0) setSelPhoto(openItem.photos[idx - 1]);
                    }}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="gal-lb-nav gal-lb-next"
                    onClick={() => {
                      const idx = openItem.photos.findIndex(p => p.id === selPhoto.id);
                      if (idx < openItem.photos.length - 1) setSelPhoto(openItem.photos[idx + 1]);
                    }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                  <div className="gal-lb-counter">
                    {openItem.photos.findIndex(p => p.id === selPhoto.id) + 1} / {openItem.photos.length}
                  </div>
                </div>

                <div className="gal-lb-single-caption">
                  <button className="gal-lb-back-sm" onClick={() => setSelPhoto(null)}>
                    <i className="bi bi-grid-3x3-gap"></i> All Photos
                  </button>
                  <div>
                    {selPhoto.caption && <strong>{selPhoto.caption}</strong>}
                    {selPhoto.detail && <p>{selPhoto.detail}</p>}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
