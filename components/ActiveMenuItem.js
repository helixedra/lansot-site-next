"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ActiveMenuItem({ href, children, locale, title }) {
  const pathname = usePathname();

  const isActive = () => {
    const path = pathname.split("/");
    const hrefPath = href.split("/");

    if (href === `/${locale}` && pathname === `/${locale}`) {
      return true;
    }

    if (hrefPath[2] === path[2]) {
      return true;
    }
  };
  return (
    <Link href={href} prefetch={true} title={title} className={isActive() ? "active" : ""}>
      {children}
    </Link>
  );
}
