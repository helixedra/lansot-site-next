"use client";
import { useState } from "react";
import Dialog from "@/components/shared/Dialog";
import classes from "./OrderButtons.module.css";
import ui from "@/app/data/ui";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Toast from "@/components/shared/Toast";

export default function OrderButtons({ locale, product }) {
  const [requestDialog, setRequestDialog] = useState(false);
  const [howDialog, setHowDialog] = useState(false);

  const initialForm = {
    name: "",
    phone: "",
    email: "",
    productName: product.name,
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const handleToast = () => {
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ status: "pending", message: "Відправка..." });

    if (!form.name || !form.email || !form.message || !form.phone) {
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
      phone: sanitizeInput(form.phone),
      productName: sanitizeInput(form.productName),
      message: sanitizeInput(form.message),
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_REQUEST_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          // console.log("SUCCESS!", response.status, response.text);
          setStatus({ status: "success", message: "Повідомлення успішно відправлено!" });
          setRequestDialog(false);
          setForm(initialForm);
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus({ status: "success", message: "Помилка при відправці" });
        }
      );
  };

  return (
    <>
      <div
        className={`${classes.order_buttons} flex-col sm:flex-row md:flex-row items-start justify-center sm:justify-start md:justify-start gap-4 mb-4`}
      >
        <button className="button_main" onClick={() => setRequestDialog(true)}>
          {ui.global.request_price[locale]}
        </button>
        <button className="button_link" onClick={() => setHowDialog(true)}>
          {ui.global.how_to_buy[locale]}
        </button>
      </div>
      <Dialog
        visibility={requestDialog}
        setVisibility={setRequestDialog}
        title={ui.global.request_price[locale]}
      >
        <form id="order" onSubmit={handleSubmit} className={classes.order_form}>
          <div className={classes.order_form_title}>
            {/* <div className={classes.heading}>{ui.global.request_price[locale]}</div> */}
            <div className={classes.subheading}>{ui.global.request_price_subheading[locale]}</div>
          </div>
          <div className={classes.send_to_msg}>
            <div className={classes.msg_links} style={{ textAlign: "center" }}>
              <a target="_blank" rel="nofollow" href="https://t.me/lansot_com">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/telegram.png`}
                  alt="telegram"
                  width={32}
                  height={32}
                />
              </a>
              <a target="_blank" rel="nofollow" href="https://wa.me/380971122616">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/whatsapp.png`}
                  alt="whatsapp"
                  width={32}
                  height={32}
                />
              </a>
              <a target="_blank" rel="nofollow" href="viber://pa?chatURI=Lansot_com">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/viber.png`}
                  alt="viber"
                  width={32}
                  height={32}
                />
              </a>
              <a target="_blank" rel="nofollow" href="https://www.messenger.com/t/lansotcom">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/messenger.png`}
                  alt="messenger"
                  width={32}
                  height={32}
                />
              </a>
            </div>
          </div>

          <div className={classes.or_devider}>
            <div className={classes.line_gr}></div>
            <div className={classes.or_devider_text}>{ui.global.or[locale]}</div>
            <div className={classes.line_gr}></div>
          </div>

          <div className="form_group">
            <label htmlFor="nameInput">{ui.form.name[locale]}</label>
            <input
              name="name"
              type="text"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form_control"
              id="nameInput"
              value={form.name}
              aria-describedby="Name"
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="phoneInput">{ui.form.phone[locale]}</label>
            <input
              name="phone"
              type="phone"
              className="form_control"
              id="phoneInput"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              value={form.phone}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="emailInput">{ui.form.email[locale]}</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              className="form_control"
              id="emailInput"
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="messageInput">{ui.form.message[locale]}</label>
            <textarea
              className="form_control"
              id="messageInput"
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="4"
              required
            ></textarea>
          </div>

          <input type="hidden" name="productName" value={product.name} />
          <input type="hidden" name="productCategory" value={product.category} />

          <button type="submit" className="button_main">
            {ui.form.submit[locale]}
          </button>
        </form>
      </Dialog>
      <Dialog
        visibility={howDialog}
        setVisibility={setHowDialog}
        title={ui.global.how_to_buy[locale]}
      >
        <div dangerouslySetInnerHTML={{ __html: ui.how_to_buy[locale] }} />
        <div className={classes.msg_links} style={{ marginTop: "2rem" }}>
          <a href="viber://pa?chatURI=Lansot_com" rel="nofollow">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/viber.png`}
              alt="viber"
              width={32}
              height={32}
            />
          </a>
          <a target="_blank" rel="nofollow" href="https://t.me/lansot_com">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/telegram.png`}
              alt="telegram"
              width={32}
              height={32}
            />
          </a>

          <a target="_blank" rel="nofollow" href="https://www.messenger.com/t/lansotcom">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/messenger.png`}
              alt="messenger"
              width={32}
              height={32}
            />
          </a>

          <a target="_blank" rel="nofollow" href="https://wa.me/380971122616">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/whatsapp.png`}
              alt="whatsapp"
              width={32}
              height={32}
            />
          </a>
        </div>
      </Dialog>
      {status && <Toast message={status.message} onClose={handleToast} status={status.status} />}
    </>
  );
}
