"use client";
import classes from "./ContactSection.module.css";
import ui from "@/app/data/ui";
// import pages from "@/app/data/pages";
import { useState } from "react";
import Toast from "@/components/shared/Toast";

export default function ContactSection({ locale, contacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleToast = () => {
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ status: "pending", message: "Відправка..." });

    if (!form.name || !form.email || !form.message) {
      setStatus({ status: "error", message: "Будь ласка, заповніть всі поля." });
      return;
    }

    const sanitizeInput = (input) => {
      const div = document.createElement("div");
      div.textContent = input;
      return div.innerHTML;
    };

    const templateParams = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      message: sanitizeInput(form.message),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateParams),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ status: "success", message: result.message });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ status: "error", message: result.message });
      }
    } catch (error) {
      console.error("FAILED...", error);
      setStatus({ status: "error", message: "Помилка при відправці" });
    }
  };

  return (
    <div className={`${classes.container} py-12 md:py-[8rem]`}>
      <div className={classes.inner_container}>
        <div className={classes.contact_info}>
          <div className={classes.contact_title}>{ui.global.invite_to_contact[locale]}</div>
          <div className={classes.contact_text}>
            <div>
              <div className={classes.label}>Tel</div>
              <div>{contacts.content}</div>
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
                  type="email"
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
          {status && (
            <Toast message={status.message} onClose={handleToast} status={status.status} />
          )}
        </div>
      </div>
    </div>
  );
}
