'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobApplicationModal from './JobApplicationModal';
import JobDetailModal from './JobDetailModal';
import { getBackendApiUrl } from '@/lib/runtime-config';

const API = getBackendApiUrl();

const benefits = [
  {
    icon: 'bi-graph-up-arrow',
    title: 'Career Growth',
    desc: 'Structured career paths, sponsorship for professional certifications, and clear promotion criteria for marine surveyors and engineers.',
    color: 'car-b-emerald',
  },
  {
    icon: 'bi-people-fill',
    title: 'Collaborative Culture',
    desc: 'Work alongside experienced surveyors and naval architects in a supportive environment where your expertise is valued.',
    color: 'car-b-teal',
  },
  {
    icon: 'bi-water',
    title: 'Meaningful Work',
    desc: 'Contribute to the safety of life at sea and the protection of the marine environment across Malaysia\u2019s maritime industry.',
    color: 'car-b-forest',
  },
  {
    icon: 'bi-heart-fill',
    title: 'Great Benefits',
    desc: 'Competitive salary, medical coverage, annual leave, performance bonuses, and continuous professional development.',
    color: 'car-b-emerald',
  },
];

const culture = [
  { icon: 'bi-lightbulb-fill', title: 'Learning First', desc: 'We invest in your growth \u2014 certifications, technical workshops, and knowledge-sharing sessions are part of the job.' },
  { icon: 'bi-award-fill', title: 'Recognise Excellence', desc: 'Outstanding performance is recognised and rewarded \u2014 from spot bonuses to promotions.' },
  { icon: 'bi-globe-asia-australia', title: 'Real Impact', desc: 'Your work classifies vessels, safeguards seafarers, and upholds maritime safety standards nationwide.' },
  { icon: 'bi-cup-hot-fill', title: 'Work-Life Balance', desc: 'Flexible arrangements, team activities, and a culture that respects your time outside the office.' },
];

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

type JobInfo = { id?: number; title: string; department: string; };

// ── DEMO preview data — automatically replaced by live backend postings.
//    Remove this once /api/public/careers returns real data.
const DEMO_OPENINGS: Opening[] = [
  {
    id: 0,
    title: 'Marine Surveyor',
    department: 'Survey & Inspection',
    type: 'Full-time',
    location: 'Shah Alam, Selangor',
    exp: '3–5 years',
    desc: 'Conduct classification and statutory surveys on Malaysian-registered vessels to ensure compliance with SCM Rules and international maritime conventions.',
    skills: ['Ship Survey', 'SOLAS', 'MARPOL', 'Class Rules', 'Report Writing'],
    highlight: true,
    overview: 'As a Marine Surveyor at SCM, you will carry out classification and statutory surveys on ships and floating structures, verifying compliance with SCM Rules, IMO conventions, and flag-state requirements. You will play a direct role in promoting safety of life at sea and protection of the marine environment.',
    responsibilities: [
      'Perform classification, statutory and occasional surveys on vessels and offshore structures.',
      'Verify compliance with SCM Rules, SOLAS, MARPOL, Load Line and other applicable conventions.',
      'Prepare accurate survey reports and recommend corrective actions.',
      'Liaise with shipowners, shipyards and flag administration representatives.',
      'Support plan approval and newbuilding survey activities as required.',
    ],
    requirements: [
      'Degree in Marine Engineering, Naval Architecture, or a related field.',
      'Minimum 3 years of relevant marine survey or shipboard experience.',
      'Familiarity with IMO conventions and classification rules.',
      'Willingness to travel and attend vessels at ports and shipyards.',
      'Strong report-writing and communication skills.',
    ],
    benefits: [
      'Competitive salary with field allowances.',
      'Sponsorship for professional certifications and training.',
      'Medical coverage and performance bonuses.',
      'Clear career progression within a national classification society.',
    ],
    employment_type: 'Permanent',
    experience_level: 'Mid-Senior',
    salaryText: 'RM 5,000 - 8,000',
    icon_theme: 'engineering',
    closing_date: null,
    posted_date: new Date().toISOString(),
  },
];

function mapPosting(p: any): Opening {
  const min = p.min_salary != null ? Number(p.min_salary).toLocaleString() : null;
  const max = p.max_salary != null ? Number(p.max_salary).toLocaleString() : null;
  const salaryText = (min || max) ? `RM ${min ?? '?'} - ${max ?? '?'}${p.salary_notes ? ' ' + p.salary_notes : ''}` : '';
  const expParts = [p.min_experience, p.max_experience].filter((x: any) => x != null);
  const exp = p.experience_level || (expParts.length ? `${expParts.join('\u2013')} years` : '');
  return {
    id: p.id,
    title: p.title,
    department: p.department || '',
    type: p.job_type || 'Full-time',
    location: p.location || '',
    exp,
    desc: p.overview || '',
    skills: Array.isArray(p.skills) ? p.skills : [],
    highlight: !!p.is_featured,
    overview: p.overview || '',
    responsibilities: Array.isArray(p.responsibilities) ? p.responsibilities : [],
    requirements: Array.isArray(p.requirements) ? p.requirements : [],
    benefits: Array.isArray(p.benefits) ? p.benefits : [],
    employment_type: p.employment_type,
    experience_level: p.experience_level,
    salaryText,
    icon_theme: p.icon_theme,
    closing_date: p.closing_date,
    posted_date: p.posted_date,
  };
}

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState<JobInfo | null>(null);
  const [detailJob, setDetailJob] = useState<Opening | null>(null);
  const [openings, setOpenings]   = useState<Opening[]>(DEMO_OPENINGS);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/api/public/careers`)
      .then(r => r.json())
      .then(json => {
        // Backend online: use its data (even an empty list → shows the
        // "No Current Openings" state). Demo preview is kept only when offline.
        if (!cancelled && json.success && Array.isArray(json.data)) {
          setOpenings(json.data.map(mapPosting));
        }
      })
      .catch(() => { /* backend offline — keep demo preview */ })
      .finally(() => { if (!cancelled) setLoadingJobs(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="car-hero">
        <div className="car-hero-bg"></div>
        <div className="car-hero-icons">
          {['bi-anchor', 'bi-compass', 'bi-life-preserver', 'bi-water', 'bi-clipboard-check', 'bi-briefcase'].map((icon, i) => (
            <div key={icon} className={`car-float-icon car-fi-${i + 1}`}>
              <i className={`bi ${icon}`}></i>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb-custom">
                  <li><Link href="/">Home</Link></li>
                  <li className="separator">›</li>
                  <li>Careers</li>
                </ol>
              </nav>
              <span className="car-hero-tag">
                <i className="bi bi-person-plus-fill"></i>
                We Are Hiring
              </span>
              <h1 className="car-hero-title">
                Build Your Career<br />
                <span>at SCM</span>
              </h1>
              <p className="car-hero-desc">
                Join Malaysia&apos;s premier Ships Classification Society. Work with experienced
                surveyors and engineers upholding maritime safety and environmental standards,
                and build a career that truly matters.
              </p>
              <div className="car-hero-actions">
                <a href="#openings" className="au-btn-primary">
                  <i className="bi bi-search"></i> View Open Positions
                </a>
                <a href="#culture" className="car-hero-ghost-btn">
                  <i className="bi bi-people-fill"></i> Our Culture
                </a>
              </div>
              <div className="car-hero-chips">
                {['Growth Culture', 'Cert Sponsorship', 'Sea + Office', 'Nationwide Work'].map((chip) => (
                  <span key={chip} className="car-chip"><i className="bi bi-check-circle-fill"></i>{chip}</span>
                ))}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="car-hero-visual">
                <div className="car-hero-ring car-ring-1"></div>
                <div className="car-hero-ring car-ring-2"></div>
                <div className="car-hero-center">
                  <i className="bi bi-person-workspace"></i>
                  <strong>Join SCM</strong>
                  <span>{loadingJobs ? 'View roles' : `${openings.length} open role${openings.length !== 1 ? 's' : ''}`}</span>
                </div>
                {openings.slice(0, 4).map((job, i) => (
                  <div key={job.title} className={`car-orbit-item car-orbit-${i + 1}`}>
                    <i className="bi bi-briefcase-fill"></i>
                    <span>{job.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN ── */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why SCM</span>
            <h2 className="section-title">Why Join Our Team?</h2>
            <p className="section-subtitle">
              SCM is more than a workplace — it&apos;s an environment where maritime professionals
              thrive, learn, and build lasting careers.
            </p>
          </div>
          <div className="row g-4">
            {benefits.map((b, i) => (
              <div className="col-lg-3 col-md-6" key={b.title}>
                <div className={`car-benefit-card ${b.color}`} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="car-benefit-icon">
                    <i className={`bi ${b.icon}`}></i>
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section className="co-section" id="openings">
        <div className="container">
          <div className="co-header">
            <h2>Current Openings</h2>
            <div className="co-divider" />
            <p>
              {loadingJobs
                ? 'Loading available positions…'
                : openings.length > 0
                  ? 'Join our dynamic team and build your career with SCM.'
                  : 'We\u2019re always looking for talented individuals to join our team.'}
            </p>
          </div>

          {loadingJobs ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,.75)' }}>
              <div className="spinner-border text-light" role="status" aria-hidden="true"></div>
              <p style={{ marginTop: 14, fontSize: 14 }}>Loading current openings…</p>
            </div>
          ) : openings.length === 0 ? (
            <div className="co-empty">
              <div className="co-empty-icon"><i className="bi bi-inbox"></i></div>
              <h3>No Current Openings</h3>
              <p>We don&apos;t have any open positions at this moment, but we&apos;re always interested in meeting talented professionals.</p>
              <p>Send us your resume and we&apos;ll keep you in mind for future opportunities.</p>
              <a href="mailto:careers@myscm.com.my?subject=Resume%20Submission" className="co-resume-btn">
                <i className="bi bi-send-fill"></i> Send Your Resume
              </a>
            </div>
          ) : (
            <div className="co-grid">
              {openings.map((job) => {
                const posted = job.posted_date
                  ? new Date(job.posted_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
                  : null;
                const closes = job.closing_date
                  ? new Date(job.closing_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : null;
                return (
                  <div key={job.id ?? job.title} className={`co-card ${job.highlight ? 'co-featured' : ''}`}>
                    {job.highlight && <span className="co-featured-badge"><i className="bi bi-star-fill"></i> Featured</span>}
                    <div className="co-card-head">
                      <div className="co-card-icon"><i className="bi bi-people-fill"></i></div>
                      <div>
                        <h3>{job.title}</h3>
                        <div className="co-card-dept">{job.department}</div>
                      </div>
                    </div>

                    <div className="co-tags">
                      {job.type && <span className="co-tag co-tag-type">{job.type}</span>}
                      {job.employment_type && <span className="co-tag co-tag-emp">{job.employment_type}</span>}
                    </div>

                    <div className="co-meta">
                      {job.location && <div className="co-meta-row"><i className="bi bi-geo-alt-fill"></i>{job.location}</div>}
                      {job.exp && <div className="co-meta-row"><i className="bi bi-briefcase-fill"></i>{job.exp}</div>}
                      {job.salaryText && <div className="co-meta-row co-salary"><i className="bi bi-cash-stack"></i>{job.salaryText}</div>}
                    </div>

                    {job.desc && <p className="co-desc">{job.desc}</p>}

                    <div className="co-actions">
                      <button className="co-btn-detail" onClick={() => setDetailJob(job)} aria-label={`View details for ${job.title}`}>
                        <i className="bi bi-eye-fill"></i> View Details
                      </button>
                      <button className="co-btn-apply" onClick={() => setActiveJob({ id: job.id, title: job.title, department: job.department })} aria-label={`Apply for ${job.title}`}>
                        <i className="bi bi-send-fill"></i> Apply Now
                      </button>
                    </div>

                    <div className="co-card-foot">
                      <span><i className="bi bi-clock"></i> {posted ? `Posted: ${posted}` : 'Recently posted'}</span>
                      <span><i className="bi bi-unlock"></i> {closes ? `Closes: ${closes}` : 'Open until filled'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section className="car-culture-section" id="culture">
        <div className="car-culture-bg"></div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ background: 'rgba(38,132,255,.15)', color: '#2684ff' }}>
              Our Culture
            </span>
            <h2 className="section-title" style={{ color: '#fff' }}>Life at SCM</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.75)' }}>
              A culture built on learning, respect, and doing meaningful work every day.
            </p>
          </div>
          <div className="row g-4">
            {culture.map((c, i) => (
              <div className="col-lg-3 col-md-6" key={c.title}>
                <div className="car-culture-card" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="car-culture-icon">
                    <i className={`bi ${c.icon}`}></i>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-white">
        <div className="container">
          <div className="au-cta-box">
            <div className="au-cta-left">
              <h2>Ready to Join the SCM Team?</h2>
              <p>Explore our open positions and apply today — we&apos;d love to hear from you.</p>
            </div>
            <div className="au-cta-right">
              <a href="#openings" className="au-btn-primary">
                <i className="bi bi-search"></i> See All Openings
              </a>
              <Link href="/contact" className="au-btn-outline">
                <i className="bi bi-envelope"></i> Contact HR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALS ── */}
      <JobDetailModal
        job={detailJob}
        onClose={() => setDetailJob(null)}
        onApply={() => {
          if (detailJob) setActiveJob({ id: detailJob.id, title: detailJob.title, department: detailJob.department });
          setDetailJob(null);
        }}
      />
      <JobApplicationModal job={activeJob} onClose={() => setActiveJob(null)} />
    </>
  );
}
