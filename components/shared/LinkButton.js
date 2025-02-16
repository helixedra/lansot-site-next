import Link from "next/link";
import classes from "./LinkButton.module.css";
export default function LinkButton({ href, children, type = "default", customStyle, title }) {
  return (
    <Link href={href} title={title} style={customStyle} className={type === "default" ? `${classes.button}` : `${classes.icon_button}`}>
      {children}
    </Link>
  );
}
