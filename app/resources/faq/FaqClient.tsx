'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import HeroInner from '@/components/sections/HeroInner';

export type FaqHero = { tag?: string; title?: string; titleAccent?: string; desc?: string };
export type FaqQA = { q: string; a: string };
export type FaqCategory = { cat: string; icon?: string; color?: string; items?: FaqQA[] };

const FALLBACK_CATEGORIES: FaqCategory[] = [
  {
    cat: 'General', icon: 'bi-info-circle',
    items: [
      { q: 'What is a Classification Society?', a: 'A Classification Society is an independent, non-governmental organisation that establishes and applies technical standards (Rules) for the design, construction and survey of ships and offshore structures. It verifies that vessels comply with these standards throughout their operational life, promoting safety of life and property at sea and protection of the marine environment.' },
      { q: 'What is Ships Classification Malaysia (SCM)?', a: 'Ships Classification Malaysia (SCM) is the national premier Classification Society of Malaysia. We provide classification, statutory certification and consultancy services for the maritime industry, and we are also a member of the Asian Classification Society (ACS).' },
      { q: 'When and why was SCM established?', a: 'SCM was established in 1994, near Kuala Lumpur, inspired by the awareness among local professionals and entrepreneurs that a national Classification Society was needed to support Malaysia\u2019s growing maritime industry \u2014 particularly the expansion of maritime transport between East Malaysia, West Malaysia and the ASEAN region.' },
      { q: 'Is SCM recognised by the Government of Malaysia?', a: 'Yes. SCM is the first local Classification Society authorised by the Government of Malaysia to provide classification and statutory certification services for all the major IMO conventions to which Malaysia is a signatory. SCM is also an ISO 9001 certified and R.O. Code compliant organisation.' },
      { q: 'Which vessels does SCM classify?', a: 'SCM largely confines its classification activities to Malaysian-registered ships. In addition, we provide inspection and certification services to vessels owned and operated by the Malaysian Royal Navy and training institutions, and carry out inspections on behalf of other government agencies.' },
      { q: 'Is SCM part of any international maritime organisations?', a: 'SCM is a member of the Asian Classification Society (ACS). We also observe the relevant international conventions, codes and standards set by the International Maritime Organization (IMO) and align with international best practices.' },
      { q: 'Where is SCM located?', a: 'SCM\u2019s headquarters is at Wisma SCM, No. 2 & 3, Block 2, Presint Alami, Persiaran Akuatik, Seksyen 13, 40675 Shah Alam, Selangor. We have also established operation offices in East and West Malaysia to serve clients effectively.' },
    ],
  },
  {
    cat: 'Classification & Surveys', icon: 'bi-clipboard-check',
    items: [
      { q: 'What types of surveys does SCM conduct?', a: 'SCM conducts a full range of classification and statutory surveys, including class entry; annual, intermediate and renewal (Special) surveys; dry-docking and in-water surveys; boiler surveys; damage and repair surveys; and statutory surveys for SOLAS, MARPOL, COLREG, Load Line, IOPP, IAPP and more.' },
      { q: 'What is class entry?', a: 'Class entry is the process of admitting a vessel into classification with SCM. For newbuildings it involves plan approval and construction survey; for existing ships it involves a review of the vessel\u2019s documentation and an entry survey to confirm compliance with SCM Rules and applicable conventions.' },
      { q: 'What is the survey cycle for a classed vessel?', a: 'Classed vessels follow a five-year survey cycle. This typically includes Annual Surveys each year, an Intermediate Survey (between the 2nd and 3rd annual), and a Renewal/Special Survey every 5 years, along with periodic dry-docking or in-water surveys.' },
      { q: 'How do I request a survey?', a: 'You can request a survey through our Contact page or by emailing infohq@myscm.com.my. Please provide your vessel particulars, the type of survey required, and the intended location and date. Our team will confirm the requirements and assign an attending surveyor.' },
      { q: 'What happens if a survey identifies deficiencies?', a: 'If deficiencies are found, the surveyor may issue Conditions of Class or recommendations with a timeframe for rectification. Depending on severity, some items must be corrected before the vessel continues in service, while others may be addressed by an agreed date.' },
      { q: 'Can SCM attend vessels outside Malaysia?', a: 'Yes. SCM can arrange surveys at ports and shipyards where vessels operate, subject to logistics and scheduling. Please contact us in advance so we can coordinate an attending surveyor.' },
      { q: 'What is the difference between a dry-docking and an in-water survey?', a: 'A dry-docking survey examines the underwater portion of the hull with the vessel out of the water in a dry dock. An in-water survey (IWS) allows examination of the underwater parts while the vessel remains afloat, using approved divers/service suppliers \u2014 available to eligible vessels as an alternative to one of the dockings.' },
    ],
  },
  {
    cat: 'Plan Approval & Newbuilding', icon: 'bi-rulers',
    items: [
      { q: 'What is plan approval?', a: 'Plan approval is the technical review of a vessel\u2019s design drawings and calculations to verify compliance with SCM Rules and statutory requirements before and during construction. It covers structural, stability, machinery, electrical and safety aspects.' },
      { q: 'What documents are required for plan approval?', a: 'Typical submissions include the general arrangement, structural drawings, tonnage and load line calculations, stability information, safety plans and relevant system diagrams. Our technical team will advise on the exact documentation for your project.' },
      { q: 'Does SCM supervise newbuilding construction?', a: 'Yes. SCM provides newbuilding construction supervision and can act as Owner\u2019s Representative, verifying hull compliance and workmanship during construction and conducting surveys through to delivery.' },
      { q: 'Does SCM handle EEDI, EEXI and SEEMP verification?', a: 'Yes. SCM provides EEDI and EEXI verification and SEEMP review as part of our plan approval and newbuilding services, supporting compliance with IMO energy-efficiency and greenhouse-gas reduction requirements.' },
    ],
  },
  {
    cat: 'Certification & Audit', icon: 'bi-patch-check',
    items: [
      { q: 'What certificates does SCM issue?', a: 'SCM issues classification certificates and statutory certificates for vessels, as well as component and equipment certification \u2014 including class certification, component certification, and certificates related to the ISM Code, ISPS Code and Maritime Labour Convention (MLC).' },
      { q: 'What is statutory certification?', a: 'Statutory certification confirms that a vessel complies with international maritime conventions and flag-state requirements. SCM performs the necessary surveys and audits and issues the corresponding statutory certificates on behalf of the administration.' },
      { q: 'What statutory audits does SCM perform?', a: 'SCM performs ISM (International Safety Management) audits, ISPS (International Ship and Port Facility Security) audits, MLC & ILO inspections, vendor audits, and Marine Facility Security Assessments (MFSA) and Plans (MFSP).' },
      { q: 'How long are certificates valid?', a: 'Validity depends on the certificate type and applicable convention \u2014 most full-term certificates are valid for up to five years, subject to the vessel maintaining class and passing the required intermediate and annual endorsements/surveys.' },
      { q: 'How can I verify the authenticity of an SCM certificate?', a: 'You can verify a certificate by contacting SCM directly at infohq@myscm.com.my with the certificate and vessel details. Our team will confirm its validity against our records.' },
    ],
  },
  {
    cat: 'Vendors & Suppliers', icon: 'bi-people',
    items: [
      { q: 'How can my company become an approved SCM vendor or service supplier?', a: 'Companies wishing to become approved vendors can apply to SCM and undergo an approval assessment (including a vendor audit where applicable). Once approved, your company is listed by service category. Contact us for the registration requirements and application form.' },
      { q: 'Where can I find the list of approved vendors?', a: 'The full list of SCM approved vendors and service suppliers is available under Resources \u2192 Technical Information \u2192 Vendors, organised by service category with contact details and validity (expiry) dates.' },
      { q: 'What services require an SCM-approved supplier?', a: 'Approved suppliers are required for services such as ultrasonic thickness measurement, in-water survey, radio communication equipment survey, VDR/SVDR performance tests, fire-fighting equipment and SCBA servicing, inflatable liferaft/lifejacket servicing, lifeboat and launching appliance servicing, and BWMS commissioning testing.' },
      { q: 'How long is vendor approval valid?', a: 'Each approved vendor listing carries a validity (expiry) date. Vendors must renew their approval before expiry to remain on the approved list. Expiry dates are shown against each company on the Vendors page.' },
    ],
  },
  {
    cat: 'Fees & Documentation', icon: 'bi-file-earmark-text',
    items: [
      { q: 'How are survey and certification fees determined?', a: 'Fees depend on factors such as vessel type and size, scope of survey, location and attendance requirements. Please contact us with your vessel and service details for a quotation.' },
      { q: 'Where can I find SCM circulars?', a: 'Official SCM circulars are published under Resources \u2192 Technical Information \u2192 Circulars, where they can be browsed by year and viewed or downloaded as PDF documents.' },
      { q: 'Where can I download SCM forms and documents?', a: 'Forms, company documents and guidelines are available under Resources \u2192 Forms & Documents. Some documents may require email verification before download.' },
    ],
  },
  {
    cat: 'Careers', icon: 'bi-briefcase',
    items: [
      { q: 'How do I apply for a job at SCM?', a: 'Visit our Careers page to view current openings and submit your application online through the application form. If there are no matching roles at the moment, you may send your CV to careers@myscm.com.my for future opportunities.' },
      { q: 'Does SCM offer training and professional development?', a: 'Yes. SCM invests in its people through sponsorship of professional certifications, technical workshops and continuous development, helping surveyors and engineers build long-term careers in maritime classification.' },
      { q: 'What qualifications does SCM look for in a surveyor?', a: 'We typically look for candidates with a degree in Marine Engineering, Naval Architecture or a related field, relevant marine survey or shipboard experience, familiarity with IMO conventions and class rules, and strong reporting and communication skills.' },
    ],
  },
];

const DEFAULT_ICON = 'bi-question-circle';

interface FaqClientProps {
  hero?: FaqHero;
  categories?: FaqCategory[];
}

export default function FaqClient({ hero, categories }: FaqClientProps) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [open, setOpen] = useState<string | null>(null);

  // Use backend categories when available (and non-empty), otherwise fallback.
  const cats: FaqCategory[] = useMemo(() => {
    const valid = (categories || []).filter(c => c?.cat && (c.items || []).length > 0);
    return valid.length > 0 ? valid : FALLBACK_CATEGORIES;
  }, [categories]);

  const catNames = cats.map(c => c.cat);
  const catIcon: Record<string, string> = useMemo(() => {
    const m: Record<string, string> = {};
    cats.forEach(c => { m[c.cat] = c.icon || DEFAULT_ICON; });
    return m;
  }, [cats]);

  const tabs = ['All', ...catNames];

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const source = activeCat === 'All' ? cats : cats.filter(c => c.cat === activeCat);
    return source
      .map(c => ({
        cat: c.cat,
        list: (c.items || []).filter(f =>
          !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
        ),
      }))
      .filter(g => g.list.length > 0);
  }, [search, activeCat, cats]);

  const heroDesc = hero?.desc
    || 'Find answers to common questions about SCM, our classification and certification services, approved vendors, and careers.';

  return (
    <>
      <HeroInner
        title="Frequently Asked Questions"
        image="/image/banner-about.jpg"
        crumbs={[{ label: 'Resources' }, { label: 'FAQ' }]}
      />

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Help Centre</span>
            <h2 className="section-title">How Can We Help You?</h2>
            <p className="section-subtitle">{heroDesc}</p>
          </div>

          {/* Search */}
          <div className="faq-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="faq-search-clear" onClick={() => setSearch('')} aria-label="Clear"><i className="bi bi-x-lg"></i></button>}
          </div>

          {/* Category filter */}
          <div className="faq-cats">
            {tabs.map(c => (
              <button
                key={c}
                className={`faq-cat-btn ${activeCat === c ? 'faq-cat-active' : ''}`}
                onClick={() => { setActiveCat(c); setOpen(null); }}
              >
                {c !== 'All' && <i className={`bi ${catIcon[c] || DEFAULT_ICON}`}></i>} {c}
              </button>
            ))}
          </div>

          {/* Accordion groups */}
          {groups.length === 0 ? (
            <div className="faq-empty"><i className="bi bi-search"></i><p>No questions match your search.</p></div>
          ) : groups.map(({ cat, list }) => (
            <div key={cat} className="faq-group">
              <h3 className="faq-group-title"><i className={`bi ${catIcon[cat] || DEFAULT_ICON}`}></i> {cat}</h3>
              <div className="faq-list">
                {list.map((f) => {
                  const id = `${cat}-${f.q}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                      <button className="faq-q" onClick={() => setOpen(isOpen ? null : id)} aria-expanded={isOpen}>
                        <span>{f.q}</span>
                        <i className={`bi bi-chevron-down faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}></i>
                      </button>
                      <div className="faq-a-wrap" style={{ maxHeight: isOpen ? '600px' : '0' }}>
                        <div className="faq-a">{f.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section section-white">
        <div className="container">
          <div className="au-cta-box">
            <div className="au-cta-left">
              <h2>Still Have Questions?</h2>
              <p>Can&apos;t find what you&apos;re looking for? Our team is ready to help.</p>
            </div>
            <div className="au-cta-right">
              <Link href="/contact" className="au-btn-primary"><i className="bi bi-envelope-fill"></i> Contact Us</Link>
              <Link href="/resources/document" className="au-btn-outline"><i className="bi bi-file-earmark-text"></i> Forms &amp; Documents</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
