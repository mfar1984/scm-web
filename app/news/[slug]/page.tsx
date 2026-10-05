import Link from 'next/link';
import { notFound } from 'next/navigation';
import AosInit from '@/components/layout/AosInit';
import { news, getArticle } from '@/lib/newsData';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: 'News | SCM' };
  return { title: `${a.title} | SCM News`, description: a.excerpt };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = news.filter(n => n.slug !== a.slug).slice(0, 3);

  return (
    <>
      <AosInit />

      {/* Hero banner */}
      <section className="news-detail-hero" style={{ backgroundImage: `url(${a.image})` }}>
        <div className="news-detail-overlay" />
        <div className="container">
          <div className="news-detail-hero-inner" data-aos="fade-up">
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb-custom">
                <li><Link href="/">Home</Link></li>
                <li className="separator">›</li>
                <li><Link href="/news">News</Link></li>
                <li className="separator">›</li>
                <li>{a.category}</li>
              </ol>
            </nav>
            <span className="news-detail-cat">{a.category}</span>
            <h1>{a.title}</h1>
            <div className="news-detail-meta">
              <span><i className="bi bi-person"></i> {a.author}</span>
              <span><i className="bi bi-calendar3"></i> {a.date}</span>
              <span><i className="bi bi-clock"></i> {a.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section section-white">
        <div className="container">
          <div className="news-article">
            <blockquote className="news-quote">{a.intro}</blockquote>

            {a.sections.map((s, i) => (
              <div key={i} className="news-block">
                <h2>{s.heading}</h2>
                {s.body.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            ))}

            {a.gallery.length > 0 && (
              <div className="news-gallery-block">
                <h3>Gallery</h3>
                <div className="news-gallery">
                  {a.gallery.map((img, i) => (
                    <div key={i} className="news-gallery-item" style={{ backgroundImage: `url(${img})` }} />
                  ))}
                </div>
              </div>
            )}

            {a.tags.length > 0 && (
              <div className="news-tags">
                <strong>Tags:</strong>
                {a.tags.map(t => <span key={t} className="news-tag">#{t.replace(/\s+/g, '')}</span>)}
              </div>
            )}

            <div className="news-share">
              <strong>Share:</strong>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="news-share-btn news-fb" aria-label="Share on Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="news-share-btn news-tw" aria-label="Share on Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="news-share-btn news-li" aria-label="Share on LinkedIn"><i className="bi bi-linkedin"></i></a>
            </div>

            <div className="news-back">
              <Link href="/news" className="au-btn-outline"><i className="bi bi-arrow-left"></i> Back to News</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Keep Reading</span>
            <h2 className="section-title">Related Articles</h2>
          </div>
          <div className="row g-4">
            {related.map((r) => (
              <div className="col-lg-4 col-md-6" key={r.slug}>
                <Link href={`/news/${r.slug}`} className="news-card">
                  <div className="news-card-media" style={{ backgroundImage: `url(${r.image})` }}>
                    <span className="news-card-cat">{r.category}</span>
                  </div>
                  <div className="news-card-body">
                    <h3>{r.title}</h3>
                    <p>{r.excerpt}</p>
                    <div className="news-card-foot">
                      <span className="news-readmore">Read More <i className="bi bi-arrow-right"></i></span>
                      <span className="news-readtime"><i className="bi bi-clock"></i> {r.readTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
