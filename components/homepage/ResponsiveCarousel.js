"use client";
import React, { useState, useEffect } from "react";
import classes from "./ResponsiveCarousel.module.css";
import Image from "next/image";

export default function ResponsiveCarousel({ slides, delay }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = slides;

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleURL = (url) => {
    if (!url || typeof url !== 'string') {
      console.error('Invalid URL provided:', url);
      return '';
    }
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND || '';
    if (!backendUrl) {
      console.error('BACKEND environment variable is not set');
      return url;
    }

    const newURL = `${backendUrl}${url}`;
    try {
      return new URL(newURL).href;
    } catch (error) {
      console.error('Error creating URL:', error);
      return url;
    }
  };

  return (
    <div className={`${classes.carousel_container}`}>
      <div
        className={classes.carousel_track}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={`${classes.carousel_slide} bg-zinc-200 h-min relative`}>
            <Image
              src={handleURL(image.Slide.url)}
              alt={image.Alt}
              title={image.Title}
              className={classes.carousel_image}
              width={1600}
              height={900}
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
              quality={75}
            />
          </div>
        ))}
      </div>

      {/* <button onClick={handlePrev}>Prev</button> */}
      {/* <button onClick={handleNext}>Next</button> */}

      {/* <div className={classes.carousel_dots}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${classes.carousel_dot} ${
              index === currentIndex ? classes.carousel_dot_active : ""
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
