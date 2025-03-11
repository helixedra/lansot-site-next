"use client";
import classes from "./ContactSection.module.css";
import ui from "@/app/data/ui";
import pages from "@/app/data/pages";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Toast from "@/components/shared/Toast";

export default function ContactSection({ locale }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ status: "pending", message: "Відправка..." });

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          // console.log("SUCCESS!", response.status, response.text);
          setStatus({ status: "success", message: "Повідомлення успішно відправлено!" });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus({ status: "success", message: "Помилка при відправці" });
        }
      );
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
          <form className={`${classes.form_container}`} onSubmit={handleSubmit}>
            <div>
              <div className={classes.inputs}>
                <input
                  className={classes.input}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={ui.global.name[locale]}
                />
                <input
                  className={classes.input}
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={ui.global.email[locale]}
                />
              </div>
              <div className={classes.inputs}>
                <textarea
                  className={classes.textarea}
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={ui.global.message[locale]}
                />
              </div>
            </div>
            <button className={classes.button} type="submit">
              {ui.global.send[locale]}
            </button>
          </form>
          {status && <Toast message={status.message} status={status.status} />}
        </div>
      </div>
    </div>
  );
}
