'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBackendApiUrl } from '@/lib/runtime-config';

const BASE = getBackendApiUrl();

const typeFromMime = (mime: string, name: string) => {
  const n = (name || '').toLowerCase();
  if (n.endsWith('.pdf') || (mime || '').includes('pdf')) return 'PDF';
  if (n.endsWith('.doc') || n.endsWith('.docx')) return 'DOCX';
  if (n.endsWith('.xls') || n.endsWith('.xlsx')) return 'XLSX';
  if (n.endsWith('.zip') || n.endsWith('.rar')) return 'ZIP';
  if (/\.(jpg|jpeg|png)$/.test(n)) return 'IMG';
  return 'FILE';
};
const typeBadge: Record<string, string> = { PDF: 'dl-badge-pdf', DOCX: 'dl-badge-docx', XLSX: 'dl-badge-xlsx', ZIP: 'dl-badge-docx', IMG: 'dl-badge-xlsx', FILE: 'dl-badge-pdf' };

type DLItem = { id: number; category: string; title: string; description: string; file_name: string; mime_type: string; file_size: string; icon: string; require_email: number; };

// DEMO preview data — replaced by live backend documents.
const DEMO_ITEMS: DLItem[] = [
  { id: -1, category: 'Company Documents', title: 'SCM Company Profile', description: 'Overview of Ships Classification Malaysia, our history, services and accreditations.', file_name: 'scm-company-profile.pdf', mime_type: 'application/pdf', file_size: '2.4 MB', icon: 'bi-file-earmark-pdf-fill', require_email: 0 },
  { id: -2, category: 'Forms', title: 'Survey Request Form', description: 'Application form to request a classification or statutory survey for your vessel.', file_name: 'survey-request-form.pdf', mime_type: 'application/pdf', file_size: '480 KB', icon: 'bi-file-earmark-text-fill', require_email: 0 },
  { id: -3, category: 'Forms', title: 'Vendor Registration Form', description: 'Register as an approved SCM vendor or service supplier.', file_name: 'vendor-registration.docx', mime_type: 'application/msword', file_size: '320 KB', icon: 'bi-file-earmark-word-fill', require_email: 1 },
  { id: -4, category: 'Guidelines', title: 'Classification Rules Summary', description: 'Summary of SCM classification rules and applicable conventions.', file_name: 'classification-rules.pdf', mime_type: 'application/pdf', file_size: '5.1 MB', icon: 'bi-file-earmark-richtext-fill', require_email: 1 },
];

export default function DocumentClient() {
  const [items, setItems] = useState<DLItem[]>(DEMO_ITEMS);
  const [loading, setLoading] = useState(false);
  const [gate, setGate] = useState<DLItem | null>(null);

  useEffect(() => {
    fetch(`${BASE}/api/public/downloads`)
      .then(r => r.json())
      .then(j => { if (j.success && Array.isArray(j.data) && j.data.length > 0) setItems(j.data); })
      .catch(() => { /* backend offline — keep demo */ })
      .finally(() => setLoading(false));
  }, []);

  const categories: { name: string; files: DLItem[] }[] = [];
  for (const it of items) {
    let g = categories.find(c => c.name === it.category);
    if (!g) { g = { name: it.category, files: [] }; categories.push(g); }
    g.files.push(it);
  }

  const handleDownload = (it: DLItem) => {
    if (it.require_email) { setGate(it); return; }
    window.open(`${BASE}/api/public/downloads/${it.id}`, '_blank');
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="dl-hero">
        <div className="dl-hero-bg"></div>
        <div className="dl-hero-docs">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`dl-float-doc dl-doc-${i + 1}`}>
              <i className={`bi ${['bi-file-earmark-pdf-fill', 'bi-file-earmark-zip-fill', 'bi-file-earmark-richtext-fill', 'bi-file-earmark-word-fill', 'bi-file-earmark-image-fill', 'bi-file-earmark-text-fill'][i]}`}></i>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-7">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb-custom" style={{ justifyContent: 'center' }}>
                  <li><Link href="/">Home</Link></li>
                  <li className="separator">›</li>
                  <li>Resources</li>
                  <li className="separator">›</li>
                  <li>Forms &amp; Documents</li>
                </ol>
              </nav>
              <span className="dl-hero-tag"><i className="bi bi-download"></i> Free Downloads</span>
              <h1 className="dl-hero-title">Forms &amp; Documents<br /><span>At Your Fingertips</span></h1>
              <p className="dl-hero-desc">Access SCM forms, company documents, guidelines and technical resources — all in one place.</p>
              <div className="dl-hero-stats">
                <div className="dl-hero-stat"><strong>{items.length}</strong><span>Documents</span></div>
                <div className="dl-hero-stat"><strong>{categories.length}</strong><span>Categories</span></div>
                <div className="dl-hero-stat"><strong>Free</strong><span>No Charge</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Document Library</span>
            <h2 className="section-title">Browse &amp; Download</h2>
            <p className="section-subtitle">Files marked with a lock require email verification before download.</p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}><div className="spinner-border spinner-border-sm me-2"></div> Loading…</div>
          ) : categories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}><i className="bi bi-folder2-open" style={{ fontSize: 36, display: 'block', marginBottom: 12 }}></i>No documents available yet. Please check back soon.</div>
          ) : categories.map((cat, ci) => (
            <div key={ci} className="dl-cat-block">
              <div className="dl-cat-header dl-ch-dl-teal">
                <div className="dl-cat-icon-wrap"><i className="bi bi-folder-fill"></i></div>
                <div><h2>{cat.name}</h2><p>{cat.files.length} file{cat.files.length !== 1 ? 's' : ''} available</p></div>
                <span className="dl-count-badge">{cat.files.length} files</span>
              </div>
              <div className="dl-files-list">
                {cat.files.map((f) => {
                  const type = typeFromMime(f.mime_type, f.file_name);
                  return (
                    <div key={f.id} className="dl-file-row">
                      <div className="dl-file-icon-wrap"><i className={`bi ${f.icon}`}></i></div>
                      <div className="dl-file-info">
                        <h3>{f.title} {f.require_email ? <i className="bi bi-lock-fill" style={{ fontSize: 12, color: '#f59e0b' }} title="Email verification required"></i> : null}</h3>
                        <p>{f.description}</p>
                        <div className="dl-file-meta">
                          <span className={`dl-type-badge ${typeBadge[type] || 'dl-badge-pdf'}`}>{type}</span>
                          {f.file_size && <span className="dl-meta-item"><i className="bi bi-file-earmark"></i> {f.file_size}</span>}
                          {f.require_email ? <span className="dl-meta-item"><i className="bi bi-envelope-check"></i> Email required</span> : null}
                        </div>
                      </div>
                      <div className="dl-file-actions">
                        <button className="dl-btn-download" onClick={() => handleDownload(f)}>
                          <i className={`bi ${f.require_email ? 'bi-unlock' : 'bi-download'}`}></i>
                          <span>{f.require_email ? 'Unlock' : 'Download'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-white">
        <div className="container">
          <div className="au-cta-box">
            <div className="au-cta-left">
              <h2>Need a Specific Document?</h2>
              <p>Request forms, technical reports or documentation for your vessel or project.</p>
            </div>
            <div className="au-cta-right">
              <Link href="/contact" className="au-btn-primary"><i className="bi bi-envelope-fill"></i> Contact Us</Link>
              <Link href="/resources/faq" className="au-btn-outline"><i className="bi bi-question-circle"></i> View FAQ</Link>
            </div>
          </div>
        </div>
      </section>

      {gate && <EmailGateModal item={gate} onClose={() => setGate(null)} />}
    </>
  );
}

function EmailGateModal({ item, onClose }: { item: DLItem; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }
    setSending(true); setError('');
    try {
      const j = await (await fetch(`${BASE}/api/public/downloads/request`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ download_id: item.id, email: email.trim(), name: name.trim(), company: company.trim() }),
      })).json();
      if (j.success) setDone(true);
      else setError(j.message || 'Something went wrong.');
    } catch { setError('Network error. Please try again.'); } finally { setSending(false); }
  };

  return (
    <div className="dlg-overlay" onClick={onClose}>
      <div className="dlg-modal" onClick={e => e.stopPropagation()}>
        <button className="dlg-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
        {done ? (
          <div className="dlg-done">
            <div className="dlg-done-icon"><i className="bi bi-envelope-check-fill"></i></div>
            <h3>Check Your Email</h3>
            <p>We&apos;ve sent a verification link to <strong>{email}</strong>. Click the link in the email to download <strong>{item.title}</strong>.</p>
            <button className="dl-btn-download" onClick={onClose} style={{ margin: '0 auto' }}><i className="bi bi-check2"></i><span>Got it</span></button>
          </div>
        ) : (
          <>
            <div className="dlg-head">
              <div className="dlg-icon"><i className="bi bi-lock-fill"></i></div>
              <div>
                <h3>Verify to Download</h3>
                <p>{item.title}</p>
              </div>
            </div>
            <p className="dlg-intro">Enter your email to receive a secure download link. We&apos;ll send you a verification link to confirm.</p>
            {error && <div className="dlg-error">{error}</div>}
            <div className="dlg-field"><label>Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" /></div>
            <div className="dlg-field"><label>Email Address <span>*</span></label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" /></div>
            <div className="dlg-field"><label>Company</label><input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company (optional)" /></div>
            <button className="dlg-submit" onClick={submit} disabled={sending}>
              {sending ? <><span className="spinner-border spinner-border-sm me-2"></span> Sending…</> : <><i className="bi bi-send-fill"></i> Send Download Link</>}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
