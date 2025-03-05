"use client";
import Button from "../shared/Button";
import LinkButton from "../shared/LinkButton";
import classes from "./ArticlesSection.module.css";
import Image from "next/image";
import { RiArrowRightFill, RiArrowLeftFill } from "react-icons/ri";
import ui from "@/app/data/ui.json";
import { useState } from "react";

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
    <div className={classes.container} {...props}>
      <div className={classes.articles}>
        <div className={classes.image}>
          <Image
            src="/images/home_slider_img_1.jpg"
            alt="Article Image"
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
                <h3 className={classes.title}>{article.title[locale]}</h3>
                <p className={classes.text}>{article.preview[locale]}</p>
                <div className={classes.controls}>
                  <LinkButton href={`/articles/${article.slug}`}>
                    {ui.global.read_more[locale]}
                  </LinkButton>
                  <SliderControls
                    handleSlider={handleSlider}
                    currentSlide={currentSlide}
                    slidesCount={articles.length}
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

export function SliderControls({ handleSlider, currentSlide, slidesCount }) {
  return (
    <div className={classes.slider_controls}>
      <div className={classes.buttons}>
        <Button action={() => handleSlider("prev")} type="icon" disabled={currentSlide === 0}>
          <RiArrowLeftFill />
        </Button>
        <Button
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
