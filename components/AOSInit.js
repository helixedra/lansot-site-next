'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 300,
      mirror: true, // Animations will play in reverse when scrolling up
      once: false, // Whether animation should happen only once - while scrolling down
      easing: 'ease-in-out',
    });
  }, []);

  return null;
}
