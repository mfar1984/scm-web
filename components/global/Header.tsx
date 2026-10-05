'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const navRef = useRef<HTMLUListElement>(null);

  const toggleMobile = () => {
    setMobileOpen(prev => !prev);
    setOpenDropdowns([]);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDropdowns([]);
  };

  const toggleDropdown = (name: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1200) {
      setOpenDropdowns(prev =>
        prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
      );
    }
  };

  // SCM Menu Structure
  type MenuChild = {
    label: string;
    href: string;
    external?: boolean;
    children?: { label: string; href: string; external?: boolean }[];
  };

  const menuItems: {
    label: string;
    href: string;
    external?: boolean;
    landing?: boolean;
    children?: MenuChild[];
  }[] = [
    { label: 'Home', href: '/' },
    {
      label: 'About', href: '/about',
      children: [
        { label: 'About Us', href: '/about/about-us' },
        { label: 'Vision & Mission', href: '/about/vision-mission' },
        { label: 'Certification', href: '/about/certifications' },
        { label: 'Organization', href: '/about/organization' },
      ],
    },
    {
      label: 'Services', href: '/services/classification/overview', landing: true,
      children: [
        { label: 'Survey & Inspection', href: '/services/classification/survey-inspection' },
        { label: 'Plan Approval & Newbuilding', href: '/services/classification/plan-approval' },
        { label: 'Audit & Certification', href: '/services/certification' },
        { label: 'Certification Services', href: '/services/classification/audit-certification' },
        { label: 'Consultancy & Advisory', href: '/services/consultancy' },
      ],
    },
    {
      label: 'Resources', href: '/resources',
      children: [
        {
          label: 'Technical Information', href: '/resources/technical-information',
          children: [
            { label: 'Vendors', href: '/resources/technical-information/vendors' },
            { label: 'Circulars', href: '/resources/technical-information/circulars' },
          ],
        },
        { label: 'Forms & Documents', href: '/resources/document' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'FAQ', href: '/resources/faq' },
      ],
    },
    { label: 'News', href: '/news' },
    { label: 'Careers', href: '/careers' },
  ];

  return (
    <header id="header">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="logo">
          <img
            src="/image/logo.png"
            alt="SCM - Survey and Certification Malaysia"
            className="logo-img"
          />
        </Link>

        {/* Nav + CTA grouped right */}
        <div className="d-flex align-items-center ms-auto gap-2">
          <nav className="navmenu">
            {/* Mobile close button — only show when menu open */}
            {mobileOpen && (
              <button className="mobile-nav-close" onClick={closeMobile} aria-label="Close menu">
                <i className="bi bi-x-lg"></i>
              </button>
            )}

            <ul ref={navRef} className={mobileOpen ? 'mobile-nav-active' : ''}>
              {menuItems.map((item) => (
                <li key={item.label} className={item.children ? `dropdown${openDropdowns.includes(item.label) ? ' open' : ''}` : ''}>
                  {item.children ? (
                    <>
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          const isMobile = typeof window !== 'undefined' && window.innerWidth < 1200;
                          if (isMobile) { e.preventDefault(); toggleDropdown(item.label); }
                          else if (!item.landing) { e.preventDefault(); }
                          else { closeMobile(); }
                        }}
                      >
                        {item.label}
                        <i className="bi bi-chevron-down" style={{ fontSize: '11px', transition: 'transform .25s', opacity: .8 }}></i>
                      </Link>
                      <ul>
                        {item.children.map((child) => (
                          child.children ? (
                            <li key={child.label} className={`dropdown dropdown-submenu${openDropdowns.includes(child.label) ? ' open' : ''}`}>
                              <a href={child.href} onClick={(e) => { e.preventDefault(); toggleDropdown(child.label); }}>
                                {child.label}
                                <i className="bi bi-chevron-right" style={{ fontSize: '11px', transition: 'transform .25s', opacity: .8, marginLeft: 'auto' }}></i>
                              </a>
                              <ul>
                                {child.children.map((sub) => (
                                  <li key={sub.label}>
                                    <Link href={sub.href} onClick={closeMobile}>{sub.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ) : (
                            <li key={child.label}>
                              {child.external ? (
                                <a href={child.href} target="_blank" rel="noopener noreferrer" onClick={closeMobile}>{child.label}</a>
                              ) : (
                                <Link href={child.href} onClick={closeMobile}>{child.label}</Link>
                              )}
                            </li>
                          )
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} onClick={closeMobile}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Us CTA */}
          <Link href="/contact" className="btn-getstarted d-none d-xl-inline-flex">
            Contact Us
          </Link>

          {/* Hamburger */}
          <button
            className="mobile-nav-toggle d-xl-none"
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
