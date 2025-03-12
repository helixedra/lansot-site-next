"use client";
import { useState } from "react";
import classes from "./TextMore.module.css";
import ui from "@/app/data/ui.json";
export default function TextMore({ children, locale }) {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <div>
      <article className={classes.category_description}>
        <div className={isReadMore ? `${classes.read_full}` : ""}>{children}</div>
      </article>
      <button onClick={() => setIsReadMore((state) => !state)} className={classes.read_more_button}>
        {isReadMore ? ui.global.read_less[locale] : ui.global.read_more[locale]}
      </button>
    </div>
  );
}
