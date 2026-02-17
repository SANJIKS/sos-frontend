"use client";
import React from "react";
import styles from "./FooterInfo.module.scss";
import {Link, usePathname} from '@/i18n/navigation'
import MainIco from "@/assets/icons/footerMain.svg";
import { useTranslations } from "next-intl";
import {classNames} from '@/shared/lib/classNames'

const FooterInfo = () => {
  const t = useTranslations();
  const pathname = usePathname();

    const sections = [
    {
      title: t("footer.whoWeAre"),
      links: [
        { text: t("footer.foundationHistory"), href: "/about/foundation-history" },
        { text: t("footer.aboutFoundation"), href: "/about/fond" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { text: t("footer.donate"), href: "/donate" },
        { text: t("footer.subscription"), href: "/subscription" },
        { text: t("footer.donationFaq"), href: "/faq" },
      ],
    },
    {
      title: t("footer.contactsPolicy"),
      links: [
        { text: t("footer.contacts"), href: "/contacts" },
        { text: t("footer.vacancies"), href: "/vacancies" },
        { text: t("footer.childProtectionPolicy"), href: "/child-protection-policy" },
      ],
    },
  ];

  return (
    <footer className={styles.footerInfo}>
      <Link href="/" className={styles.logo}>
        <MainIco className={styles.mainIcon} />
        <span className={styles.logoText}>
          <span className={styles.bold}>{t("logoFirst")}</span>
          <span className={styles.bold}>{t("logoSecond")}</span>
        </span>
      </Link>

      {sections.map((section, i) => (
        <div key={i} className={styles.infoText}>
          <h2 className={styles.title}>{section.title}</h2>
          <div className={styles.linksContainer}>
            {section.links.map((link, j) => (
              <Link key={j} href={link.href} className={classNames(styles.text, {
                  [styles.active]: `${link.href}` === pathname,
              })}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.infoText}>
        <h2 className={styles.title}>{t("footer.contacts")}</h2>
        <p className={styles.text}>Ул. Абдымомунова, 123, Бишкек</p>
        <p className={styles.text}>info@soskg.org</p>
        <p className={styles.text}>+996 (312) 123-456</p>
      </div>
    </footer>
  );
};

export default FooterInfo;
