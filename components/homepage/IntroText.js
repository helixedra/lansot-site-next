import classes from './IntroText.module.css';
export default function IntroText({ title, content }) {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.content}>{content}</p>
    </div>
  );
}
