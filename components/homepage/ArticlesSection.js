"use client";
import Button from "../shared/Button";
import LinkButton from "../shared/LinkButton";
import classes from "./ArticlesSection.module.css";
import Image from "next/image";
import { RiArrowRightFill, RiArrowLeftFill } from "react-icons/ri";
import ui from "@/app/data/ui.json";
import { useState } from "react";
import Link from "next/link";

export default function ArticlesSection({ articles, locale, ...props }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function handleSlider(direction) {
    if (direction === "next" && currentSlide < articles.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }

    if (direction === "prev" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  return (
    <div className={`${classes.container} mx-auto mb-[8rem]`} {...props}>
      <div className={classes.articles}>
        <div className={classes.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_1.jpg`}
            alt={ui.global.articles[locale]}
            title={ui.global.articles[locale]}
            style={{ objectFit: "cover" }}
            width={1350}
            height={700}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.content__header}>
            <div className={classes.category}>{ui.global.articles[locale]}</div>
            <div className={classes.indicator}>
              {currentSlide + 1}/{articles.length}
            </div>
          </div>
          <div className={classes.article_container}>
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`${classes.article} ${
                  index === currentSlide ? classes.visible : classes.hidden
                }`}
              >
                <Link href={`/${locale}/articles/${article.slug}`}>
                  <h3 className={classes.title}>{article.title[locale]}</h3>
                </Link>
                <p className={classes.text}>{article.preview[locale]}</p>
                <div className={classes.controls}>
                  <Button
                    href={`/${locale}/articles/${article.slug}`}
                    title={ui.global.read_more[locale]}
                  >
                    {ui.global.read_more[locale]}
                  </Button>
                  <SliderControls
                    handleSlider={handleSlider}
                    currentSlide={currentSlide}
                    slidesCount={articles.length}
                    locale={locale}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SliderControls({ handleSlider, currentSlide, slidesCount, locale }) {
  return (
    <div className={classes.slider_controls}>
      <div className={classes.buttons}>
        <Button
          title={ui.global.back[locale]}
          action={() => handleSlider("prev")}
          type="icon"
          disabled={currentSlide === 0}
        >
          <RiArrowLeftFill />
        </Button>
        <Button
          title={ui.global.next[locale]}
          action={() => handleSlider("next")}
          type="icon"
          disabled={currentSlide === slidesCount - 1}
        >
          <RiArrowRightFill />
        </Button>
      </div>
    </div>
  );
}
