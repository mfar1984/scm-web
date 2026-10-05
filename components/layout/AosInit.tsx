'use client';

import { useEffect } from 'react';

export default function AosInit() {
  useEffect(() => {
    // Dynamically import AOS only on client side
    import('aos').then((AOS) => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    });
  }, []);

  return null;
}
