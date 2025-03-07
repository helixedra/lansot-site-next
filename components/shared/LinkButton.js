import Link from "next/link";
import classes from "./LinkButton.module.css";
export default function LinkButton({
  href,
  children,
  type = "default",
  customStyle,
  title,
  className,
}) {
  return (
    <Link
      href={href}
      title={title}
      style={customStyle}
      className={
        type === "default"
          ? `${classes.button} ${className}`
          : `${classes.icon_button} ${className}`
      }
    >
      {children}
    </Link>
  );
}
