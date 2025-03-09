"use client";
import { useRouter } from "next/navigation";

import classes from "./LinkButton.module.css";
export default function Button({
  action,
  children,
  type = "default",
  disabled = false,
  title = "button",
  href = false,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };
  return (
    <button
      onClick={href ? () => handleClick() : action}
      aria-label={title}
      title={title}
      className={type === "default" ? `${classes.button}` : `${classes.icon_button}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
