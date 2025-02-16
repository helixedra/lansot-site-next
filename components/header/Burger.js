"use client";
import classes from "./Burger.module.css";

export default function Burger({ active, toggle }) {
  return (
    <div id="mobile_menu" onClick={() => toggle((state) => !state)} className={`${classes.burger} ${active ? classes.change : ""}`}>
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
    </div>
  );
}
