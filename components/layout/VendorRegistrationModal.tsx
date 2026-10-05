'use client';

import { useState, useEffect, useRef } from 'react';
import { getBackendApiUrl } from '@/lib/runtime-config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const API = getBackendApiUrl();
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const STEPS = ['Company', 'Profile', 'Services', 'Documents'];

// Load reCAPTCHA v3 once (only when a site key is configured).
function loadRecaptcha() {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') return;
  if (document.getElementById('recaptcha-v3')) return;
  const s = document.createElement('script');
  s.id = 'recaptcha-v3';
  s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  s.async = true;
  document.head.appendChild(s);
}
async function getRecaptchaToken(): Promise<string> {
  const g = (window as any).grecaptcha;
  if (!RECAPTCHA_SITE_KEY || !g) return '';
  try {
    await new Promise<void>(res => g.ready(res));
    return await g.execute(RECAPTCHA_SITE_KEY, { action: 'vendor_register' });
  } catch { return ''; }
}

const MY_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu', 'W.P. Kuala Lumpur',
  'W.P. Labuan', 'W.P. Putrajaya', 'Outside Malaysia',
];

// SCM approved service-supplier categories (maritime / classification).
const SERVICE_CATEGORIES = [
  'Ultrasonic Thickness Measurement',
  'In-Water Survey',
  'Radio Communication Equipment Survey',
  'Performance Tests of VDR / SVDR',
  'Fire Extinguishing Equipment & SCBA Survey',
  'Inflatable Life-Saving Appliances Service',
  'Lifeboat & Launching Appliances Service',
  'BWMS Commissioning Testing',
  'Others',
];

export default function VendorRegistrationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [refNo, setRefNo] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  // Step 1 — Company
  const [companyName, setCompanyName] = useState('');
  const [ssm, setSsm] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [incorporation, setIncorporation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [fax, setFax] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  // Step 2 — Company Profile
  const [yearsInBiz, setYearsInBiz] = useState('');
  const [numEmployees, setNumEmployees] = useState('');
  const [turnover, setTurnover] = useState('');
  const [accreditations, setAccreditations] = useState('');

  // Step 3 — Services & Personnel
  const [services, setServices] = useState<string[]>([]);
  const [catOptions, setCatOptions] = useState<{ value: string; label: string }[]>(
    SERVICE_CATEGORIES.map(s => ({ value: s, label: s }))
  );
  const [natureOfBiz, setNatureOfBiz] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [ic, setIc] = useState('');
  const [position, setPosition] = useState('');
  const [dirContact, setDirContact] = useState('');

  // Step 4 — Documents & Declaration
  const [decl1, setDecl1] = useState(false);
  const [decl2, setDecl2] = useState(false);
  const [docs, setDocs] = useState<Record<string, { name: string; data: string }>>({});
  const [otherDocs, setOtherDocs] = useState<{ name: string; data: string }[]>([]);
  const [docError, setDocError] = useState('');

  const MAX_MB = 5;
  const readFile = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const pickSingle = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setDocs(p => { const n = { ...p }; delete n[key]; return n; }); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setDocError(`${file.name} exceeds ${MAX_MB}MB`); e.target.value = ''; return; }
    setDocError('');
    const data = await readFile(file);
    setDocs(p => ({ ...p, [key]: { name: file.name, data } }));
  };
  const pickMulti = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid: { name: string; data: string }[] = [];
    for (const file of files) {
      if (file.size > MAX_MB * 1024 * 1024) { setDocError(`${file.name} exceeds ${MAX_MB}MB`); continue; }
      valid.push({ name: file.name, data: await readFile(file) });
    }
    if (valid.length) { setDocError(''); setOtherDocs(valid); }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadRecaptcha();
      setStep(0); setSubmitted(false); setErrors({}); setSubmitError(''); setRefNo('');
      setDocs({}); setOtherDocs([]); setDocError('');
      fetch(`${API}/api/public/vendor-categories`).then(r => r.json())
        .then(j => {
          if (j.success && Array.isArray(j.data) && j.data.length) {
            const opts = j.data.map((c: any) => ({ value: c.name, label: c.short_label || c.name }));
            opts.push({ value: 'Others', label: 'Others' });
            setCatOptions(opts);
          }
        })
        .catch(() => { /* keep fallback SERVICE_CATEGORIES */ });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const toggleService = (val: string) =>
    setServices(prev => prev.includes(val) ? prev.filter(s => s !== val) : [...prev, val]);

  const validate = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!companyName.trim()) e.companyName = 'Required';
      if (!ssm.trim()) e.ssm = 'Required';
      if (!companyType) e.companyType = 'Required';
      if (!address.trim()) e.address = 'Required';
      if (!city.trim()) e.city = 'Required';
      if (!state) e.state = 'Required';
      if (!postcode.trim()) e.postcode = 'Required';
      if (!officePhone.trim()) e.officePhone = 'Required';
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email required';
    }
    if (s === 1) {
      if (!yearsInBiz.trim()) e.yearsInBiz = 'Required';
    }
    if (s === 2) {
      if (!services.length) e.services = 'Select at least one service';
      if (!natureOfBiz.trim()) e.natureOfBiz = 'Required';
      if (!directorName.trim()) e.directorName = 'Required';
      if (!position.trim()) e.position = 'Required';
      if (!dirContact.trim()) e.dirContact = 'Required';
    }
    if (s === 3) {
      if (!docs.ssm) e.docSsm = 'SSM Certificate is required';
      if (!decl1) e.decl1 = 'Required';
      if (!decl2) e.decl2 = 'Required';
    }
    return e;
  };

  const scrollTop = () => bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); scrollTop(); return; }
    setErrors({}); setStep(s => s + 1); scrollTop();
  };
  const prev = () => { setErrors({}); setStep(s => s - 1); scrollTop(); };

  const submit = async () => {
    const e = validate(3);
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true); setSubmitError('');
    try {
      const recaptcha_token = await getRecaptchaToken();
      const payload = {
        company_name: companyName, ssm, company_type: companyType, incorporation,
        address, city, state, postcode, office_phone: officePhone, fax, mobile, email, website,
        num_employees: numEmployees, turnover, years_in_biz: yearsInBiz,
        services,
        nature_of_biz: natureOfBiz,
        prod_desc: prodDesc || null,
        accreditations: accreditations || null,
        director_name: directorName, director_ic: ic, director_position: position, director_contact: dirContact,
        recaptcha_token,
        doc_ssm: docs.ssm?.data || null, doc_ssm_name: docs.ssm?.name || null,
        doc_profile: docs.profile?.data || null, doc_profile_name: docs.profile?.name || null,
        doc_financial: docs.financial?.data || null, doc_financial_name: docs.financial?.name || null,
        doc_other: otherDocs,
      };
      const res = await fetch(`${API}/api/public/supplier-register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) { setRefNo(json.reference_no || ''); setSubmitted(true); }
      else setSubmitError(json.message || 'Submission failed. Please try again.');
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally { setSubmitting(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="srm-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="srm-modal">
        <div className="srm-header">
          <div className="srm-header-left">
            <i className="bi bi-building-check"></i>
            <span>Approved Vendor Registration</span>
          </div>
          <button className="srm-close" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg"></i></button>
        </div>

        {submitted ? (
          <div className="srm-success">
            <div className="srm-success-icon"><i className="bi bi-check-lg"></i></div>
            <h2>Registration Submitted</h2>
            <p>Thank you for registering as an SCM service supplier. Our team will review your submission and contact you regarding the approval and vendor-audit process.</p>
            {refNo && <div className="srm-success-ref"><i className="bi bi-hash"></i> Reference: {refNo}</div>}
            <button className="srm-btn-close-success" onClick={onClose}><i className="bi bi-check2"></i> Done</button>
          </div>
        ) : (
          <>
            <div className="srm-stepper">
              {STEPS.map((label, i) => (
                <div key={label} className={`srm-step ${i === step ? 'srm-step-active' : ''} ${i < step ? 'srm-step-done' : ''}`}>
                  <div className="srm-step-circle">{i < step ? <i className="bi bi-check2"></i> : i + 1}</div>
                  <span className="srm-step-label">{label}</span>
                  {i < STEPS.length - 1 && <div className="srm-step-line"></div>}
                </div>
              ))}
            </div>

            <div className="srm-body" ref={bodyRef}>
              {/* STEP 1 — Company */}
              {step === 0 && (
                <div className="srm-section">
                  <h3 className="srm-section-title"><i className="bi bi-building"></i> Company Information</h3>
                  <div className="srm-row">
                    <div className="srm-field srm-field-half">
                      <label>Company Name (Registered) <span>*</span></label>
                      <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. Proscan Sdn. Bhd." className={errors.companyName ? 'srm-err' : ''} />
                      {errors.companyName && <span className="srm-error-msg">{errors.companyName}</span>}
                    </div>
                    <div className="srm-field srm-field-half">
                      <label>Registration Number (SSM) <span>*</span></label>
                      <input value={ssm} onChange={e => setSsm(e.target.value)} placeholder="e.g. 1234567-X" className={errors.ssm ? 'srm-err' : ''} />
                      {errors.ssm && <span className="srm-error-msg">{errors.ssm}</span>}
                    </div>
                  </div>
                  <div className="srm-row">
                    <div className="srm-field srm-field-half">
                      <label>Company Type <span>*</span></label>
                      <select value={companyType} onChange={e => setCompanyType(e.target.value)} className={errors.companyType ? 'srm-err' : ''}>
                        <option value="">Select...</option>
                        <option>Sdn Bhd (Private Limited)</option>
                        <option>Bhd (Public Limited)</option>
                        <option>Enterprise (Sole Prop)</option>
                        <option>Partnership</option>
                        <option>LLP (Limited Liability Partnership)</option>
                        <option>Foreign / Overseas Entity</option>
                      </select>
                      {errors.companyType && <span className="srm-error-msg">{errors.companyType}</span>}
                    </div>
                    <div className="srm-field srm-field-half">
                      <label>Date of Incorporation</label>
                      <input type="date" value={incorporation} onChange={e => setIncorporation(e.target.value)} />
                    </div>
                  </div>
                  <div className="srm-field" style={{ marginBottom: 16 }}>
                    <label>Business Address <span>*</span></label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="No. / Floor, Street, Area" rows={2} className={errors.address ? 'srm-err' : ''} />
                    {errors.address && <span className="srm-error-msg">{errors.address}</span>}
                  </div>
                  <div className="srm-row">
                    <div className="srm-field srm-field-third">
                      <label>City <span>*</span></label>
                      <input value={city} onChange={e => setCity(e.target.value)} placeholder="Shah Alam" className={errors.city ? 'srm-err' : ''} />
                      {errors.city && <span className="srm-error-msg">{errors.city}</span>}
                    </div>
                    <div className="srm-field srm-field-third">
                      <label>State <span>*</span></label>
                      <select value={state} onChange={e => setState(e.target.value)} className={errors.state ? 'srm-err' : ''}>
                        <option value="">Select...</option>
                        {MY_STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      {errors.state && <span className="srm-error-msg">{errors.state}</span>}
                    </div>
                    <div className="srm-field srm-field-third">
                      <label>Postcode <span>*</span></label>
                      <input value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="40675" className={errors.postcode ? 'srm-err' : ''} />
                      {errors.postcode && <span className="srm-error-msg">{errors.postcode}</span>}
                    </div>
                  </div>
                  <div className="srm-row">
                    <div className="srm-field srm-field-half">
                      <label>Office Phone <span>*</span></label>
                      <input value={officePhone} onChange={e => setOfficePhone(e.target.value)} placeholder="+603-XXXX XXXX" className={errors.officePhone ? 'srm-err' : ''} />
                      {errors.officePhone && <span className="srm-error-msg">{errors.officePhone}</span>}
                    </div>
                    <div className="srm-field srm-field-half">
                      <label>Fax</label>
                      <input value={fax} onChange={e => setFax(e.target.value)} placeholder="+603-XXXX XXXX" />
                    </div>
                  </div>
                  <div className="srm-row">
                    <div className="srm-field srm-field-third">
                      <label>Mobile Number</label>
                      <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+601X-XXX XXXX" />
                    </div>
                    <div className="srm-field srm-field-third">
                      <label>Email Address <span>*</span></label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="info@company.com" className={errors.email ? 'srm-err' : ''} />
                      {errors.email && <span className="srm-error-msg">{errors.email}</span>}
                    </div>
                    <div className="srm-field srm-field-third">
                      <label>Website</label>
                      <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://www.company.com" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — Profile */}
              {step === 1 && (
                <div className="srm-section">
                  <h3 className="srm-section-title"><i className="bi bi-graph-up"></i> Company Profile</h3>
                  <div className="srm-row">
                    <div className="srm-field srm-field-third">
                      <label>Years in Business <span>*</span></label>
                      <input type="number" min={0} value={yearsInBiz} onChange={e => setYearsInBiz(e.target.value)} placeholder="e.g. 10" className={errors.yearsInBiz ? 'srm-err' : ''} />
                      {errors.yearsInBiz && <span className="srm-error-msg">{errors.yearsInBiz}</span>}
                    </div>
                    <div className="srm-field srm-field-third">
                      <label>Number of Employees</label>
                      <input type="number" min={0} value={numEmployees} onChange={e => setNumEmployees(e.target.value)} placeholder="e.g. 25" />
                    </div>
                    <div className="srm-field srm-field-third">
                      <label>Annual Turnover (RM)</label>
                      <select value={turnover} onChange={e => setTurnover(e.target.value)}>
                        <option value="">Select...</option>
                        <option>Below RM 500,000</option>
                        <option>RM 500,001 – RM 1,000,000</option>
                        <option>RM 1,000,001 – RM 5,000,000</option>
                        <option>RM 5,000,001 – RM 10,000,000</option>
                        <option>Above RM 10,000,000</option>
                      </select>
                    </div>
                  </div>
                  <div className="srm-field">
                    <label>Approvals / Accreditations <em>(ISO, other Class societies, flag administrations)</em></label>
                    <textarea value={accreditations} onChange={e => setAccreditations(e.target.value)} placeholder="e.g. ISO 9001:2015, approved by other Classification Societies, flag-state authorisations…" rows={3} />
                  </div>
                </div>
              )}

              {/* STEP 3 — Services & Personnel */}
              {step === 2 && (
                <div className="srm-section">
                  <h3 className="srm-section-title"><i className="bi bi-clipboard-check"></i> Service Categories</h3>
                  <div className="srm-field">
                    <label>Category of Services Offered <span>*</span> <em>(Select all that apply)</em></label>
                    {errors.services && <span className="srm-error-msg">{errors.services}</span>}
                    <div className="srm-checkgroup">
                      {catOptions.map(o => (
                        <label key={o.value} className="srm-checkbox-label">
                          <input type="checkbox" checked={services.includes(o.value)} onChange={() => toggleService(o.value)} />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="srm-field" style={{ marginTop: 16 }}>
                    <label>Nature of Business <span>*</span></label>
                    <textarea value={natureOfBiz} onChange={e => setNatureOfBiz(e.target.value)} placeholder="Describe your main marine / survey service activities…" rows={2} className={errors.natureOfBiz ? 'srm-err' : ''} />
                    {errors.natureOfBiz && <span className="srm-error-msg">{errors.natureOfBiz}</span>}
                  </div>
                  <div className="srm-field" style={{ marginTop: 16 }}>
                    <label>Equipment / Capabilities</label>
                    <textarea value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="List key equipment, qualified technicians / certifications relevant to the services…" rows={2} />
                  </div>

                  <h3 className="srm-section-title" style={{ marginTop: 28 }}><i className="bi bi-person-badge"></i> Contact Person / Director</h3>
                  <div className="srm-row">
                    <div className="srm-field srm-field-half">
                      <label>Name <span>*</span></label>
                      <input value={directorName} onChange={e => setDirectorName(e.target.value)} placeholder="Full name" className={errors.directorName ? 'srm-err' : ''} />
                      {errors.directorName && <span className="srm-error-msg">{errors.directorName}</span>}
                    </div>
                    <div className="srm-field srm-field-half">
                      <label>IC / Passport Number</label>
                      <input value={ic} onChange={e => setIc(e.target.value)} placeholder="XXXXXX-XX-XXXX" />
                    </div>
                  </div>
                  <div className="srm-row">
                    <div className="srm-field srm-field-half">
                      <label>Position <span>*</span></label>
                      <input value={position} onChange={e => setPosition(e.target.value)} placeholder="e.g. Managing Director" className={errors.position ? 'srm-err' : ''} />
                      {errors.position && <span className="srm-error-msg">{errors.position}</span>}
                    </div>
                    <div className="srm-field srm-field-half">
                      <label>Contact Number <span>*</span></label>
                      <input value={dirContact} onChange={e => setDirContact(e.target.value)} placeholder="+601X-XXX XXXX" className={errors.dirContact ? 'srm-err' : ''} />
                      {errors.dirContact && <span className="srm-error-msg">{errors.dirContact}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — Documents */}
              {step === 3 && (
                <div className="srm-section">
                  <h3 className="srm-section-title"><i className="bi bi-folder2-open"></i> Supporting Documents</h3>
                  <p className="srm-doc-note">
                    <i className="bi bi-info-circle"></i>
                    Upload scanned copies (PDF, JPG or PNG). Max 5MB per file. <strong>SSM Certificate is mandatory.</strong>
                  </p>
                  {docError && <span className="srm-error-msg" style={{ display: 'block', marginBottom: 10 }}>{docError}</span>}
                  {errors.docSsm && <span className="srm-error-msg" style={{ display: 'block', marginBottom: 10 }}>{errors.docSsm}</span>}
                  <div className="srm-docs-grid">
                    {[
                      { label: 'SSM Certificate (Form 9/24/49)', key: 'ssm', req: true, multi: false },
                      { label: 'Company Profile', key: 'profile', req: false, multi: false },
                      { label: 'Financial Statement (Latest)', key: 'financial', req: false, multi: false },
                      { label: 'Accreditation / ISO / Approval Certificates', key: 'other', req: false, multi: true },
                    ].map(doc => (
                      <div key={doc.label} className={`srm-doc-field ${doc.multi ? 'srm-doc-full' : ''}`}>
                        <label>{doc.label} {doc.req && <span>*</span>}</label>
                        <div className="srm-file-wrap">
                          <label className="srm-file-btn">
                            <i className="bi bi-upload"></i>
                            <span>{doc.multi ? 'Choose Files' : 'Choose File'}</span>
                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple={doc.multi}
                              onChange={e => doc.multi ? pickMulti(e) : pickSingle(doc.key, e)} />
                          </label>
                          <span className="srm-file-name">
                            {doc.multi
                              ? (otherDocs.length ? `${otherDocs.length} file(s) chosen` : 'No file chosen')
                              : (docs[doc.key]?.name || 'No file chosen')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="srm-section-title" style={{ marginTop: 28 }}><i className="bi bi-check2-square"></i> Declaration</h3>
                  <div className="srm-decl-group">
                    <label className={`srm-decl-label ${errors.decl1 ? 'srm-decl-err' : ''}`}>
                      <input type="checkbox" checked={decl1} onChange={e => setDecl1(e.target.checked)} />
                      <span>I declare that all information and documents provided are true, accurate and complete.</span>
                    </label>
                    <label className={`srm-decl-label ${errors.decl2 ? 'srm-decl-err' : ''}`}>
                      <input type="checkbox" checked={decl2} onChange={e => setDecl2(e.target.checked)} />
                      <span>I consent to SCM processing this data for vendor evaluation and approval in accordance with the PDPA.</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {submitError && <div className="srm-submit-error">{submitError}</div>}
            <div className="srm-footer">
              <div className="srm-step-counter">Step {step + 1} of {STEPS.length}</div>
              <div className="srm-footer-right">
                {step > 0 && <button className="srm-btn-prev" onClick={prev}><i className="bi bi-arrow-left"></i> Back</button>}
                {step < STEPS.length - 1
                  ? <button className="srm-btn-next" onClick={next}>Next <i className="bi bi-arrow-right"></i></button>
                  : <button className="srm-btn-submit" onClick={submit} disabled={submitting}>
                      {submitting ? <><span className="spinner-border spinner-border-sm"></span> Submitting…</> : <><i className="bi bi-send-fill"></i> Submit Registration</>}
                    </button>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
