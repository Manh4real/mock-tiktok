import React, { useContext } from "react";

// styles
import styles from "../LoginModal.module.scss";

// variables
import routes from "_/config/routes";

// context
import { History } from "..";

// components
import LoginStart from "../LoginStart";

// types

function Footer() {
  const { pushHistory } = useContext(History);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    pushHistory(<LoginStart />, true);
  };

  return (
    <div className={styles["footer"]}>
      <p className={styles["para-text"]}>
        By continuing, you agree to TikTok's
        <a href="/">Terms of Service</a> and confirm that you have read TikTok's{" "}
        <a href="/">Privacy Policy</a>.
      </p>
      <div className={styles["footer__text"]}>
        Already have an account?
        <a href={routes.login} className="pink-font" onClick={handleClick}>
          Log in
        </a>
      </div>
    </div>
  );
}

export default Footer;
