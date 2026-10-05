'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getBackendApiUrl } from '@/lib/runtime-config';

type JobInfo = { id?: number; title: string; department: string; };
type Props   = { job: JobInfo | null; onClose: () => void; };

const API = getBackendApiUrl();

const STEPS = ['Personal', 'Address', 'Emergency', 'Education', 'Documents'];

const MYStates = [
  'Johor','Kedah','Kelantan','Melaka','Negeri Sembilan',
  'Pahang','Perak','Perlis','Pulau Pinang','Sabah',
  'Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur',
  'W.P. Labuan','W.P. Putrajaya',
];

export default function JobApplicationModal({ job, onClose }: Props) {
  const [step, setStep]           = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [refNo, setRefNo]         = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  /* ── Step 1 — Personal ── */
  const [fullName, setFullName]         = useState('');
  const [ic, setIc]                     = useState('');
  const [email, setEmail]               = useState('');
  const [phone, setPhone]               = useState('');
  const [altPhone, setAltPhone]         = useState('');
  const [dob, setDob]                   = useState('');
  const [gender, setGender]             = useState('');
  const [nationality, setNationality]   = useState('Malaysian');
  const [religion, setReligion]         = useState('');
  const [marital, setMarital]           = useState('');

  /* ── Step 2 — Address ── */
  const [icAddress, setIcAddress]       = useState('');
  const [icPostcode, setIcPostcode]     = useState('');
  const [icCity, setIcCity]             = useState('');
  const [icState, setIcState]           = useState('');
  const [icCountry, setIcCountry]       = useState('Malaysia');
  const [sameAddress, setSameAddress]   = useState(false);
  const [curAddress, setCurAddress]     = useState('');
  const [curPostcode, setCurPostcode]   = useState('');
  const [curCity, setCurCity]           = useState('');
  const [curState, setCurState]         = useState('');
  const [curCountry, setCurCountry]     = useState('Malaysia');

  /* ── Step 3 — Emergency ── */
  const [emgName, setEmgName]           = useState('');
  const [emgRelation, setEmgRelation]   = useState('');
  const [emgPhone, setEmgPhone]         = useState('');
  const [emgEmail, setEmgEmail]         = useState('');
  const [emgAddress, setEmgAddress]     = useState('');

  /* ── Step 4 — Education ── */
  const [education, setEducation]       = useState('');
  const [fieldStudy, setFieldStudy]     = useState('');
  const [yearsExp, setYearsExp]         = useState('0');
  const [lastPosition, setLastPosition] = useState('');
  const [lastEmployer, setLastEmployer] = useState('');
  const [salary, setSalary]             = useState('');
  const [notice, setNotice]             = useState('');
  const [startDate, setStartDate]       = useState('');
  const [hearAbout, setHearAbout]       = useState('');
  const [coverMsg, setCoverMsg]         = useState('');

  /* ── Step 5 — Documents (base64 data URL + original filename) ── */
  const [passportName, setPassportName] = useState('');
  const [passportData, setPassportData] = useState('');
  const [cvName, setCvName]             = useState('');
  const [cvData, setCvData]             = useState('');
  const [clName, setClName]             = useState('');
  const [clData, setClData]             = useState('');
  const [docErrors, setDocErrors]       = useState<Record<string, string>>({});

  /* ─ body scroll lock ─ */
  useEffect(() => {
    if (job) { document.body.style.overflow = 'hidden'; setStep(0); setSubmitted(false); setErrors({}); setSubmitError(''); setRefNo('');
      setPassportName(''); setPassportData(''); setCvName(''); setCvData(''); setClName(''); setClData(''); }
    else      { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [job]);

  /* ─ Escape key ─ */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  /* ─ Same address toggle ─ */
  useEffect(() => {
    if (sameAddress) {
      setCurAddress(icAddress); setCurPostcode(icPostcode);
      setCurCity(icCity); setCurState(icState); setCurCountry(icCountry);
    }
  }, [sameAddress, icAddress, icPostcode, icCity, icState, icCountry]);

  if (!job) return null;

  /* ─ Validation ─ */
  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!fullName.trim()) e.fullName = 'Required';
      if (!ic.trim())       e.ic       = 'Required';
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email required';
      if (!phone.trim())    e.phone    = 'Required';
      if (!dob)             e.dob      = 'Required';
      if (!gender)          e.gender   = 'Required';
    }
    if (s === 1) {
      if (!icAddress.trim())  e.icAddress  = 'Required';
      if (!icPostcode.trim()) e.icPostcode = 'Required';
      if (!icCity.trim())     e.icCity     = 'Required';
      if (!icState)           e.icState    = 'Required';
      if (!sameAddress) {
        if (!curAddress.trim())  e.curAddress  = 'Required';
        if (!curPostcode.trim()) e.curPostcode = 'Required';
        if (!curCity.trim())     e.curCity     = 'Required';
        if (!curState)           e.curState    = 'Required';
      }
    }
    if (s === 2) {
      if (!emgName.trim())    e.emgName    = 'Required';
      if (!emgRelation.trim())e.emgRelation= 'Required';
      if (!emgPhone.trim())   e.emgPhone   = 'Required';
    }
    if (s === 3) {
      if (!education) e.education = 'Required';
    }
    // step 4 — documents: no hard required in demo
    return e;
  };

  const scrollTop = () => bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); scrollTop(); return; }
    setErrors({});
    setStep(s => s + 1);
    scrollTop();
  };
  const prev = () => { setErrors({}); setStep(s => s - 1); scrollTop(); };

  const submit = async () => {
    const e = validate(4);
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        posting_id: job.id ?? null,
        position_applied: job.title,
        department: job.department,
        full_name: fullName, ic_number: ic, email, phone, alt_phone: altPhone,
        date_of_birth: dob, gender, nationality, religion, marital_status: marital,
        ic_address: icAddress, ic_postcode: icPostcode, ic_city: icCity, ic_state: icState, ic_country: icCountry,
        cur_address: curAddress, cur_postcode: curPostcode, cur_city: curCity, cur_state: curState, cur_country: curCountry,
        emg_name: emgName, emg_relationship: emgRelation, emg_phone: emgPhone, emg_email: emgEmail, emg_address: emgAddress,
        education, field_of_study: fieldStudy, years_experience: yearsExp,
        last_position: lastPosition, last_employer: lastEmployer,
        expected_salary: salary, notice_period: notice, available_start: startDate,
        hear_about: hearAbout, cover_message: coverMsg,
        doc_passport: passportData || null, doc_passport_name: passportName || null,
        doc_resume: cvData || null, doc_resume_name: cvName || null,
        doc_cover_letter: clData || null, doc_cover_letter_name: clName || null,
      };
      const res = await fetch(`${API}/api/public/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setRefNo(json.application_no || '');
        setSubmitted(true);
      } else {
        setSubmitError(json.message || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─ File picker — reads file as base64 with size validation (stateless) ─ */
  const FilePicker = ({
    label, hint, accept, name, errKey, onPick, maxMB, required = false,
  }: {
    label: string; hint: string; accept: string; name: string; errKey: string;
    onPick: (fileName: string, dataUrl: string) => void; maxMB: number; required?: boolean;
  }) => {
    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) { onPick('', ''); return; }
      if (file.size > maxMB * 1024 * 1024) {
        setDocErrors(prev => ({ ...prev, [errKey]: `File too large (max ${maxMB}MB)` }));
        onPick('', '');
        e.target.value = '';
        return;
      }
      setDocErrors(prev => { const n = { ...prev }; delete n[errKey]; return n; });
      const reader = new FileReader();
      reader.onload = () => onPick(file.name, String(reader.result || ''));
      reader.onerror = () => { setDocErrors(prev => ({ ...prev, [errKey]: 'Failed to read file' })); onPick('', ''); };
      reader.readAsDataURL(file);
    };
    return (
      <div className="jam-doc-field">
        <label className="jam-doc-label">
          {label} {required && <span>*</span>}
          <span className="jam-doc-hint">{hint}</span>
        </label>
        <div className="jam-file-row">
          <label className="jam-file-choose">
            Choose File
            <input type="file" accept={accept} onChange={handle} />
          </label>
          <span className="jam-file-name">{name || 'No file chosen'}</span>
        </div>
        {docErrors[errKey] && <span className="jam-error-msg" style={{ marginTop: 4, display: 'block' }}>{docErrors[errKey]}</span>}
      </div>
    );
  };

  return (
    <div
      className="jam-overlay"
    >
      <div className="jam-modal" role="dialog" aria-modal="true">

        {/* ── Header ── */}
        <div className="jam-header">
          <div>
            <p className="jam-header-title">Job Application</p>
            <p className="jam-header-subtitle">{job.title}</p>
          </div>
          <button className="jam-close" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg"></i></button>
        </div>

        {!submitted ? (
          <>
            {/* ── Stepper ── */}
            <div className="jam-stepper">
              <div className="jam-step-track">
                {STEPS.map((label, i) => (
                  <div key={label} className="jam-step-col">
                    <div className={`jam-step-circle ${i < step ? 'jam-done' : ''} ${i === step ? 'jam-active' : ''}`}>
                      {i < step ? <i className="bi bi-check-lg"></i> : i + 1}
                    </div>
                    <span className={`jam-step-label ${i <= step ? 'jam-label-active' : ''}`}>{label}</span>
                  </div>
                )).reduce<React.ReactNode[]>((acc, el, i) => {
                  acc.push(el);
                  if (i < STEPS.length - 1) acc.push(
                    <div key={`ln-${i}`} className={`jam-step-line ${i < step ? 'jam-line-done' : ''}`}></div>
                  );
                  return acc;
                }, [])}
              </div>
            </div>

            {/* ── Body ── */}
            <div className="jam-body" ref={bodyRef}>

              {/* STEP 1 — Personal */}
              {step === 0 && (
                <div className="jam-section">
                  <h3 className="jam-section-title">Personal Information</h3>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Full Name (as per IC) <span>*</span></label>
                      <input value={fullName} onChange={e => setFullName(e.target.value)} className={errors.fullName ? 'jam-err' : ''} />
                      {errors.fullName && <span className="jam-error-msg">{errors.fullName}</span>}
                    </div>
                    <div className="jam-field jam-half">
                      <label>IC Number <span>*</span></label>
                      <input value={ic} onChange={e => setIc(e.target.value)} placeholder="e.g., 900101011234" className={errors.ic ? 'jam-err' : ''} />
                      {errors.ic && <span className="jam-error-msg">{errors.ic}</span>}
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Email <span>*</span></label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={errors.email ? 'jam-err' : ''} />
                      {errors.email && <span className="jam-error-msg">{errors.email}</span>}
                    </div>
                    <div className="jam-field jam-half">
                      <label>Phone Number <span>*</span></label>
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., 0123456789" className={errors.phone ? 'jam-err' : ''} />
                      {errors.phone && <span className="jam-error-msg">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Alternative Phone</label>
                      <input value={altPhone} onChange={e => setAltPhone(e.target.value)} />
                    </div>
                    <div className="jam-field jam-half">
                      <label>Date of Birth <span>*</span></label>
                      <input type="date" value={dob} onChange={e => setDob(e.target.value)} className={errors.dob ? 'jam-err' : ''} />
                      {errors.dob && <span className="jam-error-msg">{errors.dob}</span>}
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-third">
                      <label>Gender <span>*</span></label>
                      <select value={gender} onChange={e => setGender(e.target.value)} className={errors.gender ? 'jam-err' : ''}>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                      {errors.gender && <span className="jam-error-msg">{errors.gender}</span>}
                    </div>
                    <div className="jam-field jam-third">
                      <label>Nationality</label>
                      <input value={nationality} onChange={e => setNationality(e.target.value)} />
                    </div>
                    <div className="jam-field jam-third">
                      <label>Religion</label>
                      <input value={religion} onChange={e => setReligion(e.target.value)} />
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Marital Status</label>
                      <select value={marital} onChange={e => setMarital(e.target.value)}>
                        <option value="">Select</option>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — Address */}
              {step === 1 && (
                <div className="jam-section">
                  <h3 className="jam-section-title">Address Information</h3>

                  <h4 className="jam-sub-title">Address as per IC</h4>
                  <div className="jam-field" style={{ marginBottom: 14 }}>
                    <label>Full Address <span>*</span></label>
                    <textarea rows={2} value={icAddress} onChange={e => setIcAddress(e.target.value)} className={errors.icAddress ? 'jam-err' : ''} />
                    {errors.icAddress && <span className="jam-error-msg">{errors.icAddress}</span>}
                  </div>
                  <div className="jam-row">
                    <div className="jam-field jam-quarter">
                      <label>Postcode <span>*</span></label>
                      <input value={icPostcode} onChange={e => setIcPostcode(e.target.value)} maxLength={5} className={errors.icPostcode ? 'jam-err' : ''} />
                      {errors.icPostcode && <span className="jam-error-msg">{errors.icPostcode}</span>}
                    </div>
                    <div className="jam-field jam-quarter">
                      <label>City <span>*</span></label>
                      <input value={icCity} onChange={e => setIcCity(e.target.value)} className={errors.icCity ? 'jam-err' : ''} />
                      {errors.icCity && <span className="jam-error-msg">{errors.icCity}</span>}
                    </div>
                    <div className="jam-field jam-quarter">
                      <label>State <span>*</span></label>
                      <select value={icState} onChange={e => setIcState(e.target.value)} className={errors.icState ? 'jam-err' : ''}>
                        <option value="">Select</option>
                        {MYStates.map(s => <option key={s}>{s}</option>)}
                      </select>
                      {errors.icState && <span className="jam-error-msg">{errors.icState}</span>}
                    </div>
                    <div className="jam-field jam-quarter">
                      <label>Country</label>
                      <input value={icCountry} onChange={e => setIcCountry(e.target.value)} />
                    </div>
                  </div>

                  <label className="jam-same-check">
                    <input type="checkbox" checked={sameAddress} onChange={e => setSameAddress(e.target.checked)} />
                    <span>Current address same as IC address</span>
                  </label>

                  <h4 className="jam-sub-title" style={{ marginTop: 20 }}>Current Address</h4>
                  <div className="jam-field" style={{ marginBottom: 14 }}>
                    <label>Full Address <span>*</span></label>
                    <textarea rows={2} value={curAddress} onChange={e => setCurAddress(e.target.value)} disabled={sameAddress} className={errors.curAddress ? 'jam-err' : ''} />
                    {errors.curAddress && <span className="jam-error-msg">{errors.curAddress}</span>}
                  </div>
                  <div className="jam-row">
                    <div className="jam-field jam-quarter">
                      <label>Postcode <span>*</span></label>
                      <input value={curPostcode} onChange={e => setCurPostcode(e.target.value)} maxLength={5} disabled={sameAddress} className={errors.curPostcode ? 'jam-err' : ''} />
                      {errors.curPostcode && <span className="jam-error-msg">{errors.curPostcode}</span>}
                    </div>
                    <div className="jam-field jam-quarter">
                      <label>City <span>*</span></label>
                      <input value={curCity} onChange={e => setCurCity(e.target.value)} disabled={sameAddress} className={errors.curCity ? 'jam-err' : ''} />
                      {errors.curCity && <span className="jam-error-msg">{errors.curCity}</span>}
                    </div>
                    <div className="jam-field jam-quarter">
                      <label>State <span>*</span></label>
                      <select value={curState} onChange={e => setCurState(e.target.value)} disabled={sameAddress} className={errors.curState ? 'jam-err' : ''}>
                        <option value="">Select</option>
                        {MYStates.map(s => <option key={s}>{s}</option>)}
                      </select>
                      {errors.curState && <span className="jam-error-msg">{errors.curState}</span>}
                    </div>
                    <div className="jam-field jam-quarter">
                      <label>Country</label>
                      <input value={curCountry} onChange={e => setCurCountry(e.target.value)} disabled={sameAddress} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — Emergency */}
              {step === 2 && (
                <div className="jam-section">
                  <h3 className="jam-section-title">Emergency Contact</h3>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Name <span>*</span></label>
                      <input value={emgName} onChange={e => setEmgName(e.target.value)} className={errors.emgName ? 'jam-err' : ''} />
                      {errors.emgName && <span className="jam-error-msg">{errors.emgName}</span>}
                    </div>
                    <div className="jam-field jam-half">
                      <label>Relationship <span>*</span></label>
                      <input value={emgRelation} onChange={e => setEmgRelation(e.target.value)} placeholder="e.g., Spouse, Parent" className={errors.emgRelation ? 'jam-err' : ''} />
                      {errors.emgRelation && <span className="jam-error-msg">{errors.emgRelation}</span>}
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Phone <span>*</span></label>
                      <input value={emgPhone} onChange={e => setEmgPhone(e.target.value)} className={errors.emgPhone ? 'jam-err' : ''} />
                      {errors.emgPhone && <span className="jam-error-msg">{errors.emgPhone}</span>}
                    </div>
                    <div className="jam-field jam-half">
                      <label>Email</label>
                      <input type="email" value={emgEmail} onChange={e => setEmgEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="jam-field">
                    <label>Address</label>
                    <textarea rows={3} value={emgAddress} onChange={e => setEmgAddress(e.target.value)} />
                  </div>
                </div>
              )}

              {/* STEP 4 — Education & Experience */}
              {step === 3 && (
                <div className="jam-section">
                  <h3 className="jam-section-title">Education &amp; Experience</h3>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Highest Education <span>*</span></label>
                      <select value={education} onChange={e => setEducation(e.target.value)} className={errors.education ? 'jam-err' : ''}>
                        <option value="">Select</option>
                        <option>SPM</option>
                        <option>Diploma</option>
                        <option>Bachelor&apos;s Degree</option>
                        <option>Master&apos;s Degree</option>
                        <option>PhD</option>
                        <option>Professional Certificate</option>
                        <option>TVET / Vocational</option>
                      </select>
                      {errors.education && <span className="jam-error-msg">{errors.education}</span>}
                    </div>
                    <div className="jam-field jam-half">
                      <label>Field of Study</label>
                      <input value={fieldStudy} onChange={e => setFieldStudy(e.target.value)} />
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Years of Experience</label>
                      <input type="number" min={0} value={yearsExp} onChange={e => setYearsExp(e.target.value)} />
                    </div>
                    <div className="jam-field jam-half">
                      <label>Current / Last Position</label>
                      <input value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
                    </div>
                  </div>

                  <div className="jam-field" style={{ marginBottom: 14 }}>
                    <label>Current / Last Employer</label>
                    <input value={lastEmployer} onChange={e => setLastEmployer(e.target.value)} />
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Expected Salary (RM)</label>
                      <input value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g., 5000" />
                    </div>
                    <div className="jam-field jam-half">
                      <label>Notice Period</label>
                      <select value={notice} onChange={e => setNotice(e.target.value)}>
                        <option value="">Select</option>
                        <option>Immediately</option>
                        <option>1 Week</option>
                        <option>2 Weeks</option>
                        <option>1 Month</option>
                        <option>2 Months</option>
                        <option>3 Months</option>
                        <option>Negotiable</option>
                      </select>
                    </div>
                  </div>

                  <div className="jam-row">
                    <div className="jam-field jam-half">
                      <label>Available Start Date</label>
                      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="jam-field jam-half">
                      <label>How did you hear about us?</label>
                      <select value={hearAbout} onChange={e => setHearAbout(e.target.value)}>
                        <option value="">Select</option>
                        <option>JobStreet</option>
                        <option>LinkedIn</option>
                        <option>Indeed</option>
                        <option>Company Website</option>
                        <option>Referral</option>
                        <option>Social Media</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="jam-field">
                    <label>Cover Message</label>
                    <textarea
                      rows={4}
                      value={coverMsg}
                      onChange={e => setCoverMsg(e.target.value)}
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 5 — Documents */}
              {step === 4 && (
                <div className="jam-section">
                  <h3 className="jam-section-title">Upload Documents</h3>

                  <div className="jam-docs-grid">
                    <FilePicker
                      label="Passport Photo"
                      hint="(Max 2MB, JPG/PNG)"
                      accept=".jpg,.jpeg,.png"
                      name={passportName}
                      errKey="passport"
                      maxMB={2}
                      onPick={(n, d) => { setPassportName(n); setPassportData(d); }}
                      required
                    />
                    <FilePicker
                      label="Resume / CV"
                      hint="(Max 5MB, PDF)"
                      accept=".pdf"
                      name={cvName}
                      errKey="resume"
                      maxMB={5}
                      onPick={(n, d) => { setCvName(n); setCvData(d); }}
                      required
                    />
                    <FilePicker
                      label="Cover Letter"
                      hint="(Optional, Max 5MB, PDF)"
                      accept=".pdf"
                      name={clName}
                      errKey="cover"
                      maxMB={5}
                      onPick={(n, d) => { setClName(n); setClData(d); }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="jam-footer">
              <div className="jam-footer-left">
                {submitError && (
                  <span style={{ color: '#dc2626', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <i className="bi bi-exclamation-circle-fill"></i> {submitError}
                  </span>
                )}
                {!submitError && step > 0 && (
                  <button className="jam-btn-prev" onClick={prev}>
                    <i className="bi bi-arrow-left"></i> Previous
                  </button>
                )}
              </div>
              <div className="jam-footer-right">
                <button className="jam-btn-cancel" onClick={onClose} disabled={submitting}>Cancel</button>
                {step < STEPS.length - 1 ? (
                  <button className="jam-btn-next" onClick={next}>
                    Next <i className="bi bi-arrow-right"></i>
                  </button>
                ) : (
                  <button className="jam-btn-submit" onClick={submit} disabled={submitting}>
                    {submitting
                      ? <><span className="spinner-border spinner-border-sm" style={{ width: 14, height: 14, marginRight: 6 }}></span> Submitting...</>
                      : <><i className="bi bi-check-circle-fill"></i> Submit Application</>}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ── Success ── */
          <div className="jam-success">
            <div className="jam-success-icon"><i className="bi bi-check-circle-fill"></i></div>
            <h2>Application Submitted!</h2>
            <p>
              Thank you, <strong>{fullName}</strong>. Your application for{' '}
              <strong>{job.title}</strong> has been received. Our HR team will
              contact you at <strong>{email}</strong> within 5–7 business days.
            </p>
            <div className="jam-success-ref">
              <i className="bi bi-hash"></i>
              Reference: {refNo || `SCM-HR-${Date.now().toString().slice(-8)}`}
            </div>
            <button className="jam-btn-next" onClick={onClose}>
              <i className="bi bi-house"></i> Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

