  import classes from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const footerData = {
  "footer": {
    "uk": {
      "facebookPage": "Сторінка Facebook",
      "instagramPage": "Сторінка Instagram",
      "copyright": "© {currentYear} Lansot - Меблі в мінімалістичному стилі",
      "terms": "Договір публічної оферти"
    },
    "en": {
      "facebookPage": "Facebook Page",
      "instagramPage": "Instagram Page",
      "copyright": "© {currentYear} Lansot - Furniture in minimalist style",
      "terms": "Public Offer Agreement"
    }
  },
};

export default async function Footer({ locale }) {
  const currentYear = await new Date().getFullYear();
  const footer = footerData.footer[locale];

  return (
    <footer className={`${classes.footer}`}>
      <div className="wrapper max-w-[1600px] mx-auto px-6">
        <div className={classes.footer_top}>
          <div className={classes.footer_logo}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/lansot-logo-small.svg`}
              alt="lansot logo"
              title="Lansot"
              width={100}
              height={50}
              priority={true}
            />
          </div>
          <div className={`${classes.social_icons} flex`}>
            <a
              href="https://www.facebook.com/lansotcom/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={footer.facebookPage}
              title={footer.facebookPage}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/facebook.svg`}
                title={footer.facebookPage}
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/lansot_com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={footer.instagramPage}
              title={footer.instagramPage}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/instagram.svg`}
                title={footer.instagramPage}
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        <div className={classes.footer_bottom}>
          <div>{footer.copyright.replace("{currentYear}", currentYear)}</div>
          <div className={classes.footer_links}>
            <Link href={`/docs/${locale}/terms.html`} rel="nofollow" target="_blank">{footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
