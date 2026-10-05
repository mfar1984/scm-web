'use client';

import { useEffect } from 'react';

type Opening = {
  id?: number;
  title: string;
  department: string;
  type: string;
  location: string;
  exp: string;
  desc: string;
  skills: string[];
  highlight: boolean;
  overview?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  employment_type?: string;
  experience_level?: string;
  salaryText?: string;
  icon_theme?: string;
  closing_date?: string | null;
  posted_date?: string | null;
};

const ICON_MAP: Record<string, string> = {
  it: 'bi-laptop', sales: 'bi-graph-up-arrow', hr: 'bi-people-fill',
  engineering: 'bi-tools', technical: 'bi-gear-fill', general: 'bi-briefcase-fill',
};

type Props = { job: Opening | null; onClose: () => void; onApply: () => void };

function Block({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: 22 }}>
      <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1e3a8a', marginBottom: 12 }}>{title}</h4>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontSize: 14, color: '#374151', lineHeight: 1.9 }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function fmtDate(d?: string | null) {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return null;
  return dt.toLocaleDateString('en-MY', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function JobDetailModal({ job, onClose, onApply }: Props) {
  useEffect(() => {
    if (job) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [job]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!job) return null;

  const detailRows = [
    { label: 'Job Type', value: job.type },
    { label: 'Employment Type', value: job.employment_type || '—' },
    { label: 'Salary Range', value: job.salaryText || 'Not specified', accent: true },
    { label: 'Experience Level', value: job.experience_level || job.exp || '—' },
    { label: 'Location', value: job.location || '—' },
    { label: 'Department', value: job.department || '—' },
    { label: 'Posted', value: fmtDate(job.posted_date) || '—' },
    { label: 'Closing Date', value: fmtDate(job.closing_date) || 'Open until filled', accent: true },
  ];

  return (
    <div className="jam-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="jam-modal" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="jam-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 10, background: '#fef9c3', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              <i className={`bi ${ICON_MAP[job.icon_theme || 'general'] || ICON_MAP.general}`}></i>
            </div>
            <div>
              <p className="jam-header-title">{job.title}</p>
              <p className="jam-header-subtitle">{job.department}</p>
            </div>
          </div>
          <button className="jam-close" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg"></i></button>
        </div>

        {/* Body */}
        <div className="jam-body">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, paddingBottom: 24 }}>
            {/* Left — content */}
            <div style={{ flex: '2 1 460px', minWidth: 0 }}>
              {job.overview && (
                <div style={{ marginBottom: 22 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1e3a8a', marginBottom: 12 }}>Job Overview</h4>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{job.overview}</p>
                </div>
              )}
              <Block title="Key Responsibilities" items={job.responsibilities} />
              <Block title="Requirements" items={job.requirements} />
              <Block title="What We Offer" items={job.benefits} />
              {job.skills.length > 0 && (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1e3a8a', marginBottom: 12 }}>Skills</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {job.skills.map(s => <span key={s} className="car-skill-tag">{s}</span>)}
                  </div>
                </div>
              )}
            </div>

            {/* Right — details */}
            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '18px 20px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 14 }}>Job Details</h4>
                {detailRows.map((r, i) => (
                  <div key={r.label} style={{ padding: '9px 0', borderBottom: i === detailRows.length - 1 ? 'none' : '1px solid #eef2f7' }}>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 3 }}>{r.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: r.accent ? '#16a34a' : '#1f2937' }}>{r.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="jam-footer">
          <div className="jam-footer-left"></div>
          <div className="jam-footer-right">
            <button className="jam-btn-cancel" onClick={onClose}>Close</button>
            <button className="jam-btn-submit" onClick={onApply}>
              <i className="bi bi-send-fill"></i> Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
