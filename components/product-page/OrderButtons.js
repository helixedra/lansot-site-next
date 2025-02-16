"use client";
import { useState } from "react";
import Dialog from "@/components/shared/Dialog";
import classes from "./OrderButtons.module.css";
import ui from "@/app/data/ui";
import Image from "next/image";

export default function OrderButtons({ locale, product }) {
  const [requestDialog, setRequestDialog] = useState(false);
  const [howDialog, setHowDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "ok") {
        alert("Дякуємо, ваш запит успішно відправлено");
      } else {
        alert("Виникла помилка!");
      }
    } catch (error) {
      alert("Виникла помилка!");
    }
  };

  return (
    <>
      <div className={classes.order_buttons}>
        <button className="button_main" onClick={() => setRequestDialog(true)}>
          {ui.global.request_price[locale]}
        </button>
        <button className="button_link" onClick={() => setHowDialog(true)}>
          {ui.global.how_to_buy[locale]}
        </button>
      </div>
      <Dialog visibility={requestDialog} setVisibility={setRequestDialog} title={ui.global.request_price[locale]}>
        <form id="order" onSubmit={handleSubmit} className={classes.order_form}>
          <div className={classes.order_form_title}>
            {/* <div className={classes.heading}>{ui.global.request_price[locale]}</div> */}
            <div className={classes.subheading}>{ui.global.request_price_subheading[locale]}</div>
          </div>
          <div className={classes.send_to_msg}>
            <div className={classes.msg_links} style={{ textAlign: "center" }}>
              <a target="_blank" rel="nofollow" href="https://t.me/lansot_com">
                <Image src="/images/telegram.png" alt="telegram" width={32} height={32} />
              </a>
              <a target="_blank" rel="nofollow" href="https://wa.me/380971122616">
                <Image src="/images/whatsapp.png" alt="whatsapp" width={32} height={32} />
              </a>
              <a target="_blank" rel="nofollow" href="viber://pa?chatURI=Lansot_com">
                <Image src="/images/viber.png" alt="viber" width={32} height={32} />
              </a>
              <a target="_blank" rel="nofollow" href="https://www.messenger.com/t/lansotcom">
                <Image src="/images/messenger.png" alt="messenger" width={32} height={32} />
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
            <input name="name" type="text" className="form_control" id="nameInput" aria-describedby="Name" required />
          </div>
          <div className="form_group">
            <label htmlFor="phoneInput">{ui.form.phone[locale]}</label>
            <input name="phone" type="tel" className="form_control" id="phoneInput" required />
          </div>
          <div className="form_group">
            <label htmlFor="emailInput">{ui.form.email[locale]}</label>
            <input name="email" type="email" className="form_control" id="emailInput" required />
          </div>
          <div className="form_group">
            <label htmlFor="messageInput">{ui.form.message[locale]}</label>
            <textarea className="form_control" id="messageInput" name="message" rows="4" required></textarea>
          </div>

          <input type="hidden" name="productName" value={product.name} />
          <input type="hidden" name="productCategory" value={product.category} />

          <button type="submit" className="button_main">
            {ui.form.submit[locale]}
          </button>
        </form>
      </Dialog>
      <Dialog visibility={howDialog} setVisibility={setHowDialog} title={ui.global.how_to_buy[locale]}>
        <div dangerouslySetInnerHTML={{ __html: ui.how_to_buy[locale] }} />
        <div className={classes.msg_links} style={{ marginTop: "2rem" }}>
          <a href="viber://pa?chatURI=Lansot_com" rel="nofollow">
            <Image src="/images/viber.png" alt="viber" width={32} height={32} />
          </a>
          <a target="_blank" rel="nofollow" href="https://t.me/lansot_com">
            <Image src="/images/telegram.png" alt="telegram" width={32} height={32} />
          </a>

          <a target="_blank" rel="nofollow" href="https://www.messenger.com/t/lansotcom">
            <Image src="/images/messenger.png" alt="messenger" width={32} height={32} />
          </a>

          <a target="_blank" rel="nofollow" href="https://wa.me/380971122616">
            <Image src="/images/whatsapp.png" alt="whatsapp" width={32} height={32} />
          </a>
        </div>
      </Dialog>
    </>
  );
}
