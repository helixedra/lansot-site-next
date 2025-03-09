import classes from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import page from "@/app/data/pages.json";

export default async function Footer({ locale }) {
  const currentYear = await new Date().getFullYear();
  const footerData = await page.footer[locale];

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
            />
          </div>
          <div className={`${classes.social_icons} flex`}>
            <a
              href="https://www.facebook.com/lansotcom/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={footerData?.facebookPage}
              title={footerData?.facebookPage}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/facebook.svg`}
                title={footerData?.facebookPage}
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/lansot_com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={footerData?.instagramPage}
              title={footerData?.instagramPage}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/instagram.svg`}
                title={footerData?.instagramPage}
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        <div className={classes.footer_bottom}>
          <div>{footerData?.copyright.replace("{currentYear}", currentYear)}</div>
          <div className={classes.footer_links}>
            <Link href="/terms">{footerData?.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
