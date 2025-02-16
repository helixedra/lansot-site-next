import classes from "./RadioSelector.module.css";
export default function RadioSelector({ id, title, options, selected, setSelected }) {
  return (
    <div className={classes.radio_selector}>
      <div className={classes.group_title}>{title}</div>
      <div className={classes.group_container}>
        {options.map((option, key) => (
          <div key={key} className={classes.group_item}>
            <button name={id} value={option} className={selected === option ? `${classes.item} ${classes.selected}` : classes.item} onClick={(e) => setSelected(e)}>
              {option}
            </button>
            {/* <input type="radio" name={id} value={option} defaultChecked={key === 0 ? true : false} onChange={(e) => setSelected(e)} />
            <label htmlFor={id}>{option}</label> */}
          </div>
        ))}
      </div>
    </div>
  );
}
