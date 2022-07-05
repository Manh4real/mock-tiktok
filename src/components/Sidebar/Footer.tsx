import React from "react";
import clsx from "clsx";

// styles
import styles from "./Sidebar.module.scss";

function Footer() {
  return (
    <div
      className={clsx(styles["sidebar__section"], styles["sidebar__footer"])}
    >
      <ul className={styles["sidebar__footer-list"]}>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            About
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Tiktok Browse
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            NewsRoom
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Contact
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Careers
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            ByteDance
          </a>
        </li>
      </ul>
      <ul className={styles["sidebar__footer-list"]}>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Tiktok for Good
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Advertise
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Developers
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Transparency
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            TikTok Rewards
          </a>
        </li>
      </ul>
      <ul className={styles["sidebar__footer-list"]}>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Help
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Safety
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Terms
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Privacy
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Creator Portal
          </a>
        </li>
        <li>
          <a href="/" className={styles["sidebar__footer-link"]}>
            Community Guidelines
          </a>
        </li>
      </ul>

      <p>© 2022 TikTok</p>
    </div>
  );
}

export default Footer;
