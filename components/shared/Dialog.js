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
    <dialog open={visibility} className={`${classes.dialog} z-[60]`}>
      <div ref={backdropRef} className={classes.backdrop} onClick={handleBackdropClick}>
        <div className="bg-white p-6 w-full md:w-[500px] mx-auto" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="flex justify-between items-center text-xl font-semibold pb-8">
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
