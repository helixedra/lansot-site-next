"use client";
import React, { useState } from "react";
import classes from "./Tooltip.module.css";
import { RiInformationLine } from "react-icons/ri";

export default function Tooltip({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={classes.tooltip_container} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <RiInformationLine className={classes.tooltip_button} />
      {visible && <div className={classes.tooltip_text}>{children}</div>}
    </div>
  );
}
