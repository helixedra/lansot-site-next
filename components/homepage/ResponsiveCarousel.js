"use client";
import React, { useState, useEffect } from "react";
import classes from "./ResponsiveCarousel.module.css";
import Image from "next/image";

export default function ResponsiveCarousel({ images, delay, locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className={classes.carousel_container}>
      <div
        className={classes.carousel_track}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={classes.carousel_slide}>
            <Image
              src={image.img}
              alt={image.alt[locale]}
              title={image.alt[locale]}
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
