"use client";
import { useState, useEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { RiArrowRightFill, RiArrowLeftFill } from "react-icons/ri";
import classes from "./ItemsSlider.module.css";
import ui from "@/app/data/ui.json";

export default function ItemsSlider({ children, slideWidth, locale }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [slidesCount, setSlidesCount] = useState(0);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    if (currentSlide === slidesCount) {
      setNext(false);
    } else {
      setNext(true);
    }
    if (currentSlide > 1) {
      setPrev(true);
    } else {
      setPrev(false);
    }
  }, [currentSlide, slidesCount]);

  useEffect(() => {
    const handleResize = () => {
      resize();
    };

    resize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function resize() {
    const slides = sliderContainerRef.current.children;
    setSlidesCount(slides.length);
    const windowSize = window.innerWidth;

    let newWidth = slideWidth;

    if (windowSize < 768) {
      newWidth = 298;
    }

    Array.from(slides).forEach((slide) => {
      slide.style.width = `${newWidth}px`;
      slide.style.minWidth = `${newWidth}px`;
    });
  }

  function handleSlider(currentSlide, direction) {
    const gap = 16;
    const slideWidth = sliderContainerRef.current.children[0].offsetWidth + gap;
    const sliderContainer = sliderContainerRef.current;

    if (direction === "next") {
      if (currentSlide < slidesCount) {
        setCurrentSlide(currentSlide + 1);
        sliderContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
      }
    } else if (direction === "prev") {
      if (currentSlide > 1) {
        setCurrentSlide(currentSlide - 1);
        sliderContainer.style.transform = `translateX(-${slideWidth * (currentSlide - 2)}px)`;
      }
    }
  }

  const bind = useDrag(({ down, movement: [mx], cancel }) => {
    if (down && mx > 10) {
      handleSlider(currentSlide, "prev");
      cancel();
    }
    if (down && mx < -10) {
      handleSlider(currentSlide, "next");
      cancel();
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.slider}>
        <div
          className={classes.slider__container}
          ref={sliderContainerRef}
          style={{ touchAction: "none" }}
          {...bind()}
          role="region"
          aria-label={ui.global.slider[locale]}
        >
          {children}
        </div>
      </div>
      <div className={classes.slider__nav}>
        <button
          style={{ visibility: prev ? "visible" : "hidden" }}
          className={classes.slider__nav__prev}
          onClick={() => handleSlider(currentSlide, "prev")}
          aria-label={ui.global.back[locale] || "Back"}
          title={ui.global.back[locale] || "Back"}
        >
          <RiArrowLeftFill />
        </button>
        <button
          style={{ visibility: next ? "visible" : "hidden" }}
          className={classes.slider__nav__next}
          onClick={() => handleSlider(currentSlide, "next")}
          aria-label={ui.global.next[locale] || "Next"}
          title={ui.global.next[locale] || "Next"}
        >
          <RiArrowRightFill />
        </button>
      </div>
    </div>
  );
}
