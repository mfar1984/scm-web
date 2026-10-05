import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Col 1: Company Info */}
          <div className="footer-col footer-col-company">
            <Link href="/" className="footer-logo-badge">
              <img
                src="/image/logo.png"
                alt="SCM - Ships Classification Malaysia"
                className="footer-logo-img"
              />
            </Link>
            <address>
              <strong>SHIPS CLASSIFICATION (MALAYSIA) SDN. BHD.</strong><br />
              <span>(Co. No.: 290129-X)</span><br />
              <span>Wisma SCM, No. 2 &amp; 3, Block 2,</span><br />
              <span>Presint Alami, Persiaran Akuatik,</span><br />
              <span>Seksyen 13, 40675 Shah Alam,</span><br />
              <span>Selangor, Malaysia.</span>
            </address>
          </div>

          {/* Col 2: Our Portal */}
          <div className="footer-col">
            <h4>Our Portal</h4>
            <ul className="footer-links">
              <li><a href="http://qnap.myscm.com.my" target="_blank" rel="noopener noreferrer">QNAP</a></li>
              <li><a href="https://myscm.com.my/webmail" target="_blank" rel="noopener noreferrer">Webmail</a></li>
              <li><a href="https://osmosystem.myscm.com.my/" target="_blank" rel="noopener noreferrer">OSMOSYS</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="https://www.imo.org/" target="_blank" rel="noopener noreferrer">International Maritime Organization</a></li>
              <li><a href="https://www.asiancs.org/html/" target="_blank" rel="noopener noreferrer">Association of Asian Classification Societies</a></li>
              <li><a href="https://www.marine.gov.my/" target="_blank" rel="noopener noreferrer">Marine Department of Malaysia</a></li>
              <li><a href="https://iacs.org.uk/" target="_blank" rel="noopener noreferrer">International Association of Classification Societies</a></li>
              <li><a href="https://www.mot.gov.my/en" target="_blank" rel="noopener noreferrer">Ministry of Transport Malaysia</a></li>
            </ul>
          </div>

          {/* Col 5: Subscribe */}
          <div className="footer-col">
            <h4>Subscribe</h4>
            <p>Stay updated with our latest news.</p>
            <NewsletterForm />
            <div className="social-links">
              <a href="https://facebook.com/scm" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://linkedin.com/company/scm" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:infohq@myscm.com.my" className="social-link" aria-label="Email">
                <i className="bi bi-envelope"></i>
              </a>
              <a href="https://wa.me/60355138170" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
