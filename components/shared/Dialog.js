"use client";
import classes from "./Dialog.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useRef } from "react";
export default function Dialog({ visibility, setVisibility, title, children }) {
  const backdropRef = useRef(null);

  function handleBackdropClick(e) {
    if (e.target === backdropRef.current) setVisibility(false);
  }
  return (
    <dialog open={visibility} className={classes.dialog}>
      <div ref={backdropRef} className={classes.backdrop} onClick={handleBackdropClick}>
        <div className={classes.body}>
          <div className={classes.header}>
            <div className={classes.title}>{title}</div>
            <button className={classes.close} onClick={() => setVisibility(false)}>
              <RiCloseLine />
            </button>
          </div>
          {children}
        </div>
      </div>
    </dialog>
  );
}
