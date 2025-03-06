"use client";
import classes from "./ContactSection.module.css";
import ui from "@/app/data/ui";
import pages from "@/app/data/pages";

export default function ContactSection({ locale }) {
  const handleForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className={`${classes.container} py-12 md:py-[8rem]`}>
      <div className={classes.inner_container}>
        <div className={classes.contact_info}>
          <div className={classes.contact_title}>{ui.global.invite_to_contact[locale]}</div>
          <div className={classes.contact_text}>
            <div>
              <div className={classes.label}>Tel</div>
              <div>{pages.contacts[locale].info.phone}</div>
            </div>
            <div>
              <div className={classes.label}>Email</div>
              <div>{pages.contacts[locale].info.email}</div>
            </div>
          </div>
        </div>
        <div className={classes.contact_form}>
          <form className={`${classes.form_container}`} onSubmit={handleForm}>
            <div>
              <div className={classes.inputs}>
                <input className={classes.input} type="text" placeholder={ui.global.name[locale]} />
                <input
                  className={classes.input}
                  type="text"
                  placeholder={ui.global.email[locale]}
                />
              </div>
              <div className={classes.inputs}>
                <textarea className={classes.textarea} placeholder={ui.global.message[locale]} />
              </div>
            </div>
            <button className={classes.button} type="submit">
              {ui.global.send[locale]}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
