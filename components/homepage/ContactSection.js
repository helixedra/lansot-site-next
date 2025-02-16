import classes from "./ContactSection.module.css";
export default function ContactSection() {
  return (
    <div className={classes.container}>
      <div className={classes.inner_container}>
        <div className={classes.contact_info}>
          <div className={classes.contact_title}>Запрошуємо до контакту</div>
          <div className={classes.contact_text}>
            <div>
              <div className={classes.label}>Tel</div>
              <div>38 097 112 26 16</div>
            </div>
            <div>
              <div className={classes.label}>Email</div>
              <div>info@lansot.com</div>
            </div>
          </div>
        </div>
        <div className={classes.contact_form}>
          <form action={console.log("form submitted")} method="POST" className={classes.form_container}>
            <div>
              <div className={classes.inputs}>
                <input className={classes.input} type="text" placeholder="Ім'я" />
                <input className={classes.input} type="text" placeholder="Email" />
              </div>
              <div className={classes.inputs}>
                <textarea className={classes.textarea} placeholder="Повідомлення" />
              </div>
            </div>
            <button className={classes.button} type="submit">
              Відправити
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
