import React, { useContext } from "react";

// styles
import styles from "../LoginModal.module.scss";

// variables
import routes from "_/config/routes";

// context
import { History } from "..";

// components
import SignUpStart from "../SignUpStart";

// types

function Footer() {
  const { pushHistory } = useContext(History);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    pushHistory(<SignUpStart />, true);
  };

  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__text"]}>
        Don't have an account
        <a href={routes.signup} className="pink-font" onClick={handleClick}>
          Sign up
        </a>
      </div>
    </div>
  );
}

export default Footer;
