import classes from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${classes.footer}`}>
      <div className="wrapper max-w-[1600px] mx-auto px-6">
        <div className={classes.footer_top}>
          <div className={classes.footer_logo}>
            <Image
              src="/images/lansot-logo-small.svg"
              alt="lansot logo логотип лансот"
              width={100}
              height={50}
            />
          </div>
          <div className={`${classes.social_icons} flex`}>
            <a
              href="https://www.facebook.com/lansotcom/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Страница Facebook">
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/lansot_com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Страница Instagram">
              <Image
                src="/images/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        <div className={classes.footer_bottom}>
          <div>© {currentYear} Lansot - Меблі в мінімалістичному стилі</div>
          <div className={classes.footer_links}>
            <Link href="/terms">Договір публічної оферти</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
