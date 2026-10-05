'use client';

import { useState, useEffect, useMemo } from 'react';
import HeroInner from '@/components/sections/HeroInner';
import { getBackendApiUrl } from '@/lib/runtime-config';

const BASE = getBackendApiUrl();

type Circular = {
  id: number;
  no: string;        // e.g. "3/99"
  title: string;
  year: number;
  date: string;      // release date (kept for sorting) e.g. "12 Oct 1999"
  release_date?: string;
  effective_date?: string;
  file?: string;     // local/absolute PDF url (overrides backend endpoint)
  has_file?: boolean; // backend flag: a PDF is attached
};

// DEMO preview data — replaced automatically by live backend circulars.
const DEMO_CIRCULARS: Circular[] = [
  { id: -1, no: '3/99', title: 'Fitting of GMDSS Equipment on Board Ships', year: 1999, date: '12 Oct 1999', release_date: '12 Oct 1999', effective_date: '01 Jan 2000', file: '/circulars/Circular-3-1999-Fitting-of-GMDSS-Equipment-On-Board-Ships.pdf' },
  { id: -2, no: '2/99', title: 'Disposal of Garbage from Ships', year: 1999, date: '08 Jul 1999', release_date: '08 Jul 1999', effective_date: '01 Aug 1999' },
  { id: -3, no: '1/99', title: 'SCM Representation During Radio Surveys', year: 1999, date: '15 Mar 1999', release_date: '15 Mar 1999', effective_date: '01 Apr 1999' },
  { id: -4, no: '1/22', title: 'Ballast Water Management Compliance', year: 2022, date: '20 Jan 2022', release_date: '20 Jan 2022', effective_date: '01 Mar 2022' },
  { id: -5, no: '2/22', title: 'EEXI and CII Implementation Guidance', year: 2022, date: '05 Sep 2022', release_date: '05 Sep 2022', effective_date: '01 Jan 2023' },
  { id: -6, no: '1/23', title: 'Updated Survey Fee Schedule', year: 2023, date: '10 Feb 2023', release_date: '10 Feb 2023', effective_date: '01 Mar 2023' },
];

const fileUrl = (c: Circular) => c.file ?? `${BASE}/api/public/circulars/${c.id}`;
const hasPreview = (c: Circular) => !!c.file || !!c.has_file;
const ts = (c: Circular) => { const t = new Date(c.date).getTime(); return isNaN(t) ? c.year * 10000 : t; };

export default function CircularsClient() {
  const [items, setItems] = useState<Circular[]>(DEMO_CIRCULARS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeYear, setActiveYear] = useState<string>('All');
  const [preview, setPreview] = useState<Circular | null>(null);

  useEffect(() => {
    fetch(`${BASE}/api/public/circulars`)
      .then(r => r.json())
      .then(j => { if (j.success && Array.isArray(j.data) && j.data.length > 0) setItems(j.data); })
      .catch(() => { /* backend offline — keep demo */ })
      .finally(() => setLoading(false));
  }, []);

  const years = useMemo(
    () => Array.from(new Set(items.map(i => i.year))).sort((a, b) => b - a),
    [items]
  );

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items
      .filter(c =>
        (activeYear === 'All' || String(c.year) === activeYear) &&
        (!q || c.title.toLowerCase().includes(q) || c.no.toLowerCase().includes(q))
      )
      .sort((a, b) => ts(b) - ts(a)); // latest first
  }, [items, search, activeYear]);

  return (
    <>
      <HeroInner
        title="Circulars"
        image="/image/survey-inspection-min.png"
        crumbs={[
          { label: 'Resources' },
          { label: 'Technical Information' },
          { label: 'Circulars' },
        ]}
      />

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technical Information</span>
            <h2 className="section-title">SCM Circulars</h2>
            <p className="section-subtitle">
              Official circulars issued to ship owners, masters, agents and relevant parties.
              Search or filter by year, then click View to open the PDF.
            </p>
          </div>

          {/* Toolbar: search + year filter */}
          <div className="vnd-toolbar">
            <div className="vnd-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search circular title or number…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button className="vnd-search-clear" onClick={() => setSearch('')} aria-label="Clear"><i className="bi bi-x-lg"></i></button>}
            </div>
            <div className="vnd-cat-wrap">
              <select value={activeYear} onChange={e => setActiveYear(e.target.value)} className="vnd-cat-select">
                <option value="All">All Years</option>
                {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
              </select>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}><div className="spinner-border spinner-border-sm me-2"></div> Loading circulars…</div>
          ) : rows.length === 0 ? (
            <div className="vnd-empty"><i className="bi bi-file-earmark-text"></i><p>No circulars match your search.</p></div>
          ) : (
            <div className="vnd-table-wrap">
              <table className="vnd-table cir-table">
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>No.</th>
                    <th>Circular Title</th>
                    <th style={{ width: '130px' }}>Release Date</th>
                    <th style={{ width: '130px' }}>Effective Date</th>
                    <th style={{ width: '110px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c) => (
                    <tr key={c.id}>
                      <td><span className="cir-no">No. {c.no}</span></td>
                      <td className="cir-cell-title">
                        <div className="cir-title-inner">
                          <i className="bi bi-file-earmark-text-fill"></i>
                          <span>{c.title}</span>
                        </div>
                      </td>
                      <td className="cir-cell-date">{c.release_date || c.date || '—'}</td>
                      <td className="cir-cell-date">{c.effective_date || '—'}</td>
                      <td>
                        <button className="cir-view-btn" onClick={() => setPreview(c)}>
                          <i className="bi bi-eye-fill"></i> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* PDF preview modal */}
      {preview && (
        <div className="cir-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setPreview(null); }}>
          <div className="cir-modal">
            <div className="cir-modal-head">
              <div className="cir-modal-title">
                <span className="cir-modal-tag">SCM Circular · No. {preview.no}</span>
                <h3>{preview.title}</h3>
              </div>
              <div className="cir-modal-actions">
                {hasPreview(preview) && (
                  <a href={fileUrl(preview)} target="_blank" rel="noopener noreferrer" className="cir-modal-btn" title="Download">
                    <i className="bi bi-download"></i>
                  </a>
                )}
                <button className="cir-modal-close" onClick={() => setPreview(null)} aria-label="Close"><i className="bi bi-x-lg"></i></button>
              </div>
            </div>
            <div className="cir-modal-body">
              {!hasPreview(preview) ? (
                <div className="cir-preview-placeholder">
                  <i className="bi bi-file-earmark-pdf"></i>
                  <p><strong>{preview.title}</strong></p>
                  <p className="cir-ph-note">PDF preview loads from the document server. Connect the backend to view and download the actual circular file.</p>
                </div>
              ) : (
                <iframe src={`${fileUrl(preview)}#toolbar=1&navpanes=0&view=FitH`} title={preview.title} className="cir-iframe" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
