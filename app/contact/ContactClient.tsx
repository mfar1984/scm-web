'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import HeroInner from '@/components/sections/HeroInner';

const TITLES = [
  'Choose...', 'Mr.', 'Mis.', 'Ms', 'Master', 'Miss',
  "Dato'", 'Datin', 'Doctor', 'Datuk', 'Tun', 'YB',
  'Puan Sri', 'Toh Puan', 'Dato Sri', 'Puan', 'Tuan',
];

const SERVICES = [
  'Select a service...',
  'Classification Services',
  'Certification Services',
  'Consultancy & Advisory',
  'Survey & Inspection',
  'Plan Approval & Newbuilding',
  'Statutory Audit',
  'General Inquiry',
];

const OFFICE_HOURS = [
  { day: 'Monday', hours: '8am – 5pm', open: true },
  { day: 'Tuesday', hours: '8am – 5pm', open: true },
  { day: 'Wednesday', hours: '8am – 5pm', open: true },
  { day: 'Thursday', hours: '8am – 5pm', open: true },
  { day: 'Friday', hours: '8am – 5pm', open: true },
  { day: 'Saturday – Sunday', hours: 'Closed', open: false },
];

type FormData = {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  companyAddress: string;
  officeTel: string;
  officeFax: string;
  website: string;
  service: string;
  message: string;
  file: File | null;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormData>({
    title: '', firstName: '', lastName: '',
    phone: '', email: '',
    company: '', companyAddress: '',
    officeTel: '', officeFax: '',
    website: 'https://',
    service: '',
    message: '',
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File must be less than 30MB' }));
        return;
      }
      setForm(prev => ({ ...prev, file }));
      setFileName(file.name);
      setErrors(prev => ({ ...prev, file: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title || form.title === 'Choose...') newErrors.title = 'Please select a title';
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.message.trim() || form.message.trim().length < 10) newErrors.message = 'Please describe your requirements (min. 10 characters)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Backend integration comes later — simulate for now.
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <HeroInner
        title="Contact Us"
        image="/image/banner-about.jpg"
        crumbs={[{ label: 'Contact Us' }]}
      />

      {/* Contact Info Bar */}
      <div className="ct-info-bar">
        <div className="container">
          <div className="ct-info-items">
            <a href="tel:+60355138170" className="ct-info-item">
              <div className="ct-info-icon"><i className="bi bi-telephone-fill"></i></div>
              <div>
                <span className="ct-info-label">Call Us</span>
                <span className="ct-info-val">+603 - 5513 8170</span>
              </div>
            </a>
            <div className="ct-info-divider"></div>
            <a href="mailto:infohq@myscm.com.my" className="ct-info-item">
              <div className="ct-info-icon"><i className="bi bi-envelope-fill"></i></div>
              <div>
                <span className="ct-info-label">Email Us</span>
                <span className="ct-info-val">infohq@myscm.com.my</span>
              </div>
            </a>
            <div className="ct-info-divider"></div>
            <div className="ct-info-item">
              <div className="ct-info-icon"><i className="bi bi-printer-fill"></i></div>
              <div>
                <span className="ct-info-label">Fax</span>
                <span className="ct-info-val">+603 - 5513 8016</span>
              </div>
            </div>
            <div className="ct-info-divider"></div>
            <a href="https://wa.me/60355138170" target="_blank" rel="noopener noreferrer" className="ct-info-item">
              <div className="ct-info-icon ct-icon-green"><i className="bi bi-whatsapp"></i></div>
              <div>
                <span className="ct-info-label">WhatsApp</span>
                <span className="ct-info-val">+603 - 5513 8170</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="section ct-main">
        <div className="container">
          <div className="row g-4">

            {/* Left: Info Card */}
            <div className="col-lg-4">
              <div className="ct-info-card">
                <div className="ct-card-logo">
                  <i className="bi bi-buildings-fill"></i>
                </div>

                {/* Office Hours */}
                <div className="ct-section-block">
                  <div className="ct-block-header">
                    <i className="bi bi-clock"></i>
                    <span>Office Hours</span>
                  </div>
                  <div className="ct-hours-list">
                    {OFFICE_HOURS.map((item) => (
                      <div key={item.day} className="ct-hour-row">
                        <span className="ct-hour-day">{item.day}</span>
                        {item.open
                          ? <span className="ct-hour-time">{item.hours}</span>
                          : <span className="ct-badge-closed">Closed</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="ct-section-block">
                  <div className="ct-addr-entry">
                    <div className="ct-addr-label">Headquarters</div>
                    <p>
                      Ships Classification (Malaysia) Sdn. Bhd.<br />
                      Wisma SCM, No. 2 &amp; 3, Block 2,<br />
                      Presint Alami, Persiaran Akuatik,<br />
                      Seksyen 13, 40675 Shah Alam,<br />
                      Selangor, Malaysia.
                    </p>
                    <a href="https://www.google.com/maps/place/Ships+Classification+Malaysia+HQ/@3.0728341,101.5398059,17z" target="_blank" rel="noopener noreferrer" className="ct-maps-link">
                      <i className="bi bi-geo-alt-fill"></i> View on Maps
                    </a>
                  </div>
                </div>

                {/* Social */}
                <div className="ct-section-block ct-social-block">
                  <a href="https://facebook.com/scm" target="_blank" rel="noopener noreferrer" className="ct-social-btn" aria-label="Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://linkedin.com/company/scm" target="_blank" rel="noopener noreferrer" className="ct-social-btn ct-linkedin" aria-label="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="mailto:infohq@myscm.com.my" className="ct-social-btn ct-email" aria-label="Email">
                    <i className="bi bi-envelope-fill"></i>
                  </a>
                  <a href="https://wa.me/60355138170" target="_blank" rel="noopener noreferrer" className="ct-social-btn ct-wa" aria-label="WhatsApp">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="col-lg-8">
              <div className="ct-form-card">
                {submitted ? (
                  <div className="ct-success">
                    <div className="ct-success-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h2>Message Sent Successfully!</h2>
                    <p>Thank you for reaching out to Ships Classification Malaysia. Our team will review your inquiry and get back to you within <strong>1–2 business days</strong>.</p>
                    <p>For urgent matters, please contact us directly at <a href="tel:+60355138170">+603 - 5513 8170</a> or via email at <a href="mailto:infohq@myscm.com.my">infohq@myscm.com.my</a>.</p>
                    <button className="ct-submit-btn mt-3" onClick={() => setSubmitted(false)}>
                      <i className="bi bi-arrow-left"></i> Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="ct-form-header">
                      <h2>Send Us a Message</h2>
                      <p>Fill in the form below and our team will respond within 1–2 business days.</p>
                    </div>

                    {/* Row 1: Title + First + Last */}
                    <div className="ct-form-row ct-row-3">
                      <div className="ct-field">
                        <label>Select your Title <span className="ct-required">*</span></label>
                        <div className="ct-select-wrap">
                          <select name="title" value={form.title} onChange={handleChange} className={errors.title ? 'ct-error' : ''}>
                            {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <i className="bi bi-chevron-down ct-chevron"></i>
                        </div>
                        {errors.title && <span className="ct-err-msg">{errors.title}</span>}
                      </div>
                      <div className="ct-field">
                        <label>First Name <span className="ct-required">*</span></label>
                        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={errors.firstName ? 'ct-error' : ''} placeholder="John" />
                        {errors.firstName && <span className="ct-err-msg">{errors.firstName}</span>}
                      </div>
                      <div className="ct-field">
                        <label>Last Name <span className="ct-required">*</span></label>
                        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={errors.lastName ? 'ct-error' : ''} placeholder="Doe" />
                        {errors.lastName && <span className="ct-err-msg">{errors.lastName}</span>}
                      </div>
                    </div>

                    {/* Row 2: Phone + Email */}
                    <div className="ct-form-row ct-row-2">
                      <div className="ct-field">
                        <label>HP Number <span className="ct-required">*</span></label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={errors.phone ? 'ct-error' : ''} placeholder="0123456789" />
                        {errors.phone && <span className="ct-err-msg">{errors.phone}</span>}
                      </div>
                      <div className="ct-field">
                        <label>Email <span className="ct-required">*</span></label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} className={errors.email ? 'ct-error' : ''} placeholder="john@company.com" />
                        {errors.email && <span className="ct-err-msg">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Row 3: Company + Address */}
                    <div className="ct-form-row ct-row-2">
                      <div className="ct-field">
                        <label>Company Name</label>
                        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your Company Sdn Bhd" />
                      </div>
                      <div className="ct-field">
                        <label>Company Address</label>
                        <input type="text" name="companyAddress" value={form.companyAddress} onChange={handleChange} placeholder="No. X, Jalan..." />
                      </div>
                    </div>

                    {/* Row 4: Tel + Fax + Website */}
                    <div className="ct-form-row ct-row-3">
                      <div className="ct-field">
                        <label>Office Tel</label>
                        <input type="tel" name="officeTel" value={form.officeTel} onChange={handleChange} placeholder="03-XXXX XXXX" />
                      </div>
                      <div className="ct-field">
                        <label>Office Fax</label>
                        <input type="tel" name="officeFax" value={form.officeFax} onChange={handleChange} placeholder="03-XXXX XXXX" />
                      </div>
                      <div className="ct-field">
                        <label>Website</label>
                        <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://" />
                      </div>
                    </div>

                    {/* Row 5: Service Interest */}
                    <div className="ct-form-row ct-row-1">
                      <div className="ct-field">
                        <label>Service Interest</label>
                        <div className="ct-select-wrap">
                          <select name="service" value={form.service} onChange={handleChange}>
                            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <i className="bi bi-chevron-down ct-chevron"></i>
                        </div>
                      </div>
                    </div>

                    {/* Row 6: File Upload */}
                    <div className="ct-form-row ct-row-1">
                      <div className="ct-field">
                        <label>Upload Document <span className="ct-hint">(pdf, png, jpeg, jpg — max 30MB)</span></label>
                        <div className={`ct-file-wrap ${errors.file ? 'ct-error' : ''}`}>
                          <button type="button" className="ct-file-btn" onClick={() => fileRef.current?.click()}>
                            <i className="bi bi-paperclip"></i> Choose File
                          </button>
                          <span className="ct-file-name">{fileName}</span>
                          <input ref={fileRef} type="file" accept=".pdf,.png,.jpeg,.jpg" onChange={handleFile} style={{ display: 'none' }} />
                        </div>
                        {errors.file && <span className="ct-err-msg">{errors.file}</span>}
                      </div>
                    </div>

                    {/* Row 7: Message */}
                    <div className="ct-form-row ct-row-1">
                      <div className="ct-field">
                        <label>Requirements / Questions <span className="ct-required">*</span></label>
                        <textarea name="message" value={form.message} onChange={handleChange} className={errors.message ? 'ct-error' : ''} rows={5} placeholder="Please describe your requirements, vessel details, or questions..." />
                        {errors.message && <span className="ct-err-msg">{errors.message}</span>}
                      </div>
                    </div>

                    {/* reCAPTCHA notice */}
                    <p className="ct-recaptcha-note">
                      <i className="bi bi-shield-lock"></i>
                      This page is protected by reCAPTCHA and the Google{' '}
                      <Link href="/privacy-policy">Privacy Policy</Link> and{' '}
                      <Link href="/terms-of-service">Terms of Service</Link> apply.
                    </p>

                    {/* Submit */}
                    <div className="ct-form-footer">
                      <button type="submit" className="ct-submit-btn" disabled={loading}>
                        {loading ? (
                          <><span className="ct-spinner"></span> Sending...</>
                        ) : (
                          <><i className="bi bi-send-fill"></i> Submit</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="ct-map-section">
            <div className="ct-map-header">
              <i className="bi bi-geo-alt-fill"></i>
              <h3>Find Us</h3>
            </div>
            <div className="ct-map-wrap">
              <iframe
                src="https://maps.google.com/maps?q=Ships%20Classification%20Malaysia%20HQ&z=16&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ships Classification Malaysia HQ Location"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
