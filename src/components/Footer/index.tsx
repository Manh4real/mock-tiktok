import React from "react";

import { Logo } from "_/components/icons";

import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__upper"]}>
        <div className={styles["footer__logo"]}>
          <Logo color="#fff" />
        </div>
        <div className={styles["footer__menu"]}>
          <ul>
            <h3 className={styles["footer__menu-title"]}>Company</h3>
            <li>
              <a href="/" className={styles["footer__link"]}>
                About
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                TikTok Browse
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Newsroom
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Contact
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Careers
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                ByteDance
              </a>
            </li>
          </ul>
          <ul>
            <h3 className={styles["footer__menu-title"]}>Programs</h3>
            <li>
              <a href="/" className={styles["footer__link"]}>
                TikTok for Good
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Advertise
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Developers
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                TikTok Rewards
              </a>
            </li>
          </ul>
          <ul>
            <h3 className={styles["footer__menu-title"]}>Support</h3>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Help Center
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Safety Center
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Creator Portal
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Transparency
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Accessibility
              </a>
            </li>
          </ul>
          <ul>
            <h3 className={styles["footer__menu-title"]}>Legal</h3>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Terms of Use
              </a>
            </li>
            <li>
              <a href="/" className={styles["footer__link"]}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["footer__bottom"]}>
        <select
          name="lang"
          id="lang-select"
          className={styles["footer__lang-select"]}
        >
          <option value="en">English</option>
          <option value="vn">Viet Nam</option>
          <option value="fr">France</option>
        </select>

        <div className={styles["footer__copyright-text"]}>
          © {new Date().getFullYear()} Tiktok
        </div>
      </div>
    </div>
  );
}

export default Footer;
