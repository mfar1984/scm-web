'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
}

interface HeroData {
  slides?: Slide[];
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

const fallbackSlides: Slide[] = [
  {
    image: '/image/Slider1.jpg',
    badge: 'Malaysia Premier Classification Society',
    title: 'Ensuring Safety & Quality Standards',
    subtitle: 'Your trusted partner in maritime classification, certification, and consultancy services since 1994.',
  },
  {
    image: '/image/Slider2.jpg',
    badge: 'Member of Asian Classification Society',
    title: 'Excellence in Maritime Services',
    subtitle: 'Delivering world-class classification and certification services for the maritime industry.',
  },
];

export default function HeroSection({ data }: { data?: HeroData }) {
  const slides: Slide[] = data?.slides && data.slides.length > 0 ? data.slides : fallbackSlides;
  const ctaPrimaryLabel = data?.ctaPrimaryLabel || 'About Us';
  const ctaPrimaryHref = data?.ctaPrimaryHref || '/about';
  const ctaSecondaryLabel = data?.ctaSecondaryLabel || 'Our Services';
  const ctaSecondaryHref = data?.ctaSecondaryHref || '/services';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-change slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="hero-section">
      {/* Slider Images */}
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
          </div>
        ))}
      </div>

      {/* Rising bubble particles (maritime theme) */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`bubble bubble-${i + 1}`} />
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              {/* Badge */}
              <div className="hero-badge" data-aos="fade-down">
                <span className="hero-badge-dot"></span>
                {slides[currentSlide].badge}
              </div>

              {/* Title */}
              <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
                {slides[currentSlide].title}
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                {slides[currentSlide].subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta" data-aos="fade-up" data-aos-delay="300">
                <Link href={ctaPrimaryHref} className="btn btn-primary">
                  {ctaPrimaryLabel}
                </Link>
                <Link href={ctaSecondaryHref} className="btn btn-outline">
                  {ctaSecondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="hero-nav hero-prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="hero-nav hero-next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Animated ocean waves */}
      <div className="hero-waves" aria-hidden="true">
        <svg viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="wave-path" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="wave-parallax">
            <use href="#wave-path" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use href="#wave-path" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use href="#wave-path" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use href="#wave-path" x="48" y="7" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </section>
  );
}
