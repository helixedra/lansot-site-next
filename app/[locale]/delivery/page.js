import pages from "@/app/data/pages.json";
import classes from "./page.module.css";
import PageTitle from "@/components/shared/PageTitle";

export default async function DeliveryPage({ params }) {
  const { locale } = await params;
  const data = await pages.delivery[locale];

  return (
    <div>
      <PageTitle title={data.title} image={"sc-3_12_1s.jpg"} alt={""} />
      {/* <h1 className="page_heading">{data.title}</h1> */}
      <div className="container">
        <div className={classes.delivery_text}>
          <h2>{data.info.payment.title}</h2>
          <ul className={classes.info_bullets}>
            {data.info.payment.description.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
        <div className={classes.delivery_text}>
          <h2>{data.info.delivery.title}</h2>
          <ul className={classes.info_bullets}>
            {data.info.delivery.description.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
