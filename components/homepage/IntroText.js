import classes from "./IntroText.module.css";
export default function IntroText({ title, content }) {
  return (
    <div className={classes.container}>
      <h1 className={`${classes.title} uppercase font-semibold text-3xl md:text-4xl lg:6xl`}>{title}</h1>
      <p className={classes.content}>{content}</p>
    </div>
  );
}
