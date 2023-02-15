import React, { useContext } from "react";

// styles
import styles from "../LoginModal.module.scss";

// variables
import routes from "_/config/routes";

// context
import { History } from "..";

// components
// import SignUpStart from "../SignUpStart";

// types
import { FormLocation } from "_/components/LoginModal/types";
import { Link } from "react-router-dom";
import { ILoginModalContentType } from "_/components/LoginModal/types";

interface Props {
  at?: FormLocation;
}

function Footer({ at = FormLocation.MODAL }: Props) {
  const { pushHistory } = useContext(History);

  const replace = true;
  const handleClick = (e: React.MouseEvent) => {
    if (at === FormLocation.MODAL) {
      e.preventDefault();
      // pushHistory(<SignUpStart />, replace);
      pushHistory(ILoginModalContentType.SIGNUP_START, replace);
    }
  };

  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__text"]}>
        Don't have an account
        <Link
          to={routes.signup}
          replace={replace}
          className="pink-font"
          onClick={handleClick}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Footer;
