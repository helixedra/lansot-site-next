import classes from "./LinkButton.module.css";
export default function Button({ action, children, type = "default", disabled = false }) {
  return (
    <button onClick={action} className={type === "default" ? `${classes.button}` : `${classes.icon_button}`} disabled={disabled}>
      {children}
    </button>
  );
}
