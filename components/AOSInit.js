"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 300,
      mirror: true,
      once: false,
    });
  }, []);

  return null;
}
