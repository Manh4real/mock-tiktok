import React, { useContext } from "react";
import { Link } from "react-router-dom";

// icons
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Person } from "_/components/icons";
import { AiFillApple } from "react-icons/ai";

// components
import { WithPhoneLogin, LoginFooter } from "./login";

// styles
import styles from "./LoginModal.module.scss";

// variables

// context
import { History } from ".";

// types

function LoginStart() {
  const { pushHistory } = useContext(History);

  return (
    <>
      <div className={styles["content-wrapper"]}>
        <div className={styles["title"]}>Log in to TikTok</div>
        <div className={styles["boxes"]}>
          <Link
            to="/"
            className={styles["box"]}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              pushHistory(<WithPhoneLogin />);
            }}
          >
            <div className={styles["icon"]}>
              <Person />
            </div>
            Use phone / email / username
          </Link>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FaFacebook fill="#1877F2" />
            </div>
            Continue with Facebook
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <FaTwitter fill="#1DA1F2" />
            </div>
            Continue with Twitter
          </button>
          <button className={styles["box"]}>
            <div className={styles["icon"]}>
              <AiFillApple />
            </div>
            Continue with Apple
          </button>
        </div>
      </div>
      <LoginFooter />
    </>
  );
}

export default LoginStart;