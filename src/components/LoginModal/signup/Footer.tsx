import React, { useContext } from "react";

// styles
import styles from "../LoginModal.module.scss";

// variables
import routes from "_/config/routes";

// context
import { History } from "..";

// components
import LoginStart from "../LoginStart";
import { FormLocation } from "_/components/LoginModal/types";
import { Link } from "react-router-dom";

// types
interface Props {
  at?: FormLocation;
}

function Footer({ at = FormLocation.MODAL }: Props) {
  const { pushHistory } = useContext(History);

  const replace = true;
  const handleClick = (e: React.MouseEvent) => {
    if (at === FormLocation.MODAL) {
      e.preventDefault();
      pushHistory(<LoginStart />, replace);
    }
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
        <Link
          to={routes.login}
          replace={replace}
          className="pink-font"
          onClick={handleClick}
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Footer;
