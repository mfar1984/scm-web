'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Backend integration comes later — show a confirmation for now.
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <div className="newsletter-input-group">
        <input
          type="email"
          className="newsletter-input"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          required
        />
        <button type="submit" className="newsletter-btn">Subscribe</button>
      </div>
      {done && <span className="newsletter-success">Thank you for subscribing!</span>}
    </form>
  );
}
