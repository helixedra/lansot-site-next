"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true, // Animations only happen once
    });
  }, []);

  return null;
}
