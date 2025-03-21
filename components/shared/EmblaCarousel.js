"use client";
import "./EmblaCarousel.css";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ui from "@/app/data/ui.json";
import { RiArrowRightFill, RiArrowLeftFill } from "react-icons/ri";

export const EmblaCarousel = ({ children, locale }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla slider_container p-2">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
      <div className="slider__nav px-2">
        <button
          className="embla__prev slider__nav__prev"
          onClick={scrollPrev}
          aria-label={ui.global.back[locale] || "Back"}
          title={ui.global.back[locale] || "Back"}
        >
          <RiArrowLeftFill />
        </button>
        <button
          className="embla__next slider__nav__next"
          onClick={scrollNext}
          aria-label={ui.global.next[locale] || "Next"}
          title={ui.global.next[locale] || "Next"}
        >
          <RiArrowRightFill />
        </button>
      </div>
    </div>
  );
};
