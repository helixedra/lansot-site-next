import Image from "next/image";
import classes from "./page.module.css";
import PageTitle from "@/components/shared/PageTitle";
import page from "@/app/data/pages.json";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";

export default async function ContactsPage({ params }) {
  const { locale } = await params;
  const data = await page.contacts[locale];
  return (
    <>
      <PageTitle title="Контактна інформація" image="sc-3_12_1s.jpg" alt="Итерьер стол от лансот Bernard" />

      <div className={classes.background_img}></div>
      <div className={classes.messengers}>
        {/* <h4>Написати повідомлення</h4> */}
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
      </div>
      <div className={classes.contacts}>
        <div className={classes.contact_block}>
          <h3>{data.info.office.title}</h3>

          <div className={classes.content}>{data.info.office.content}</div>

          <div className={classes.content}>
            <h4>{data.info.schedule.title}</h4>
            <div>{data.info.schedule.content}</div>
          </div>

          <div className={classes.content}>
            <div>
              <RiMailLine fontSize={24} /> info@lansot.com
            </div>
            <div>
              <RiPhoneLine fontSize={24} />
              +38 097 112 26 16
            </div>
          </div>
        </div>
        <div className={classes.contact_block}>
          <div className={classes.content}>
            <h3>{data.info.production.title}</h3>
            <div>{data.info.production.content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
