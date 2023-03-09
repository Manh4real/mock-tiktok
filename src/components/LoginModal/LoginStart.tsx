import React, { useContext } from "react";
import { Link } from "react-router-dom";

// icons
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Person } from "_/components/icons";
import { AiFillApple } from "react-icons/ai";

// components
import { LoginFooter } from "./login";
import Tooltip from "_/components/Tooltip";

// styles
import styles from "./LoginModal.module.scss";

// context
import { History } from ".";

// firebase
import { signInWithGoogle, signInWithFacebook } from "_/firebase";

// types
import { FormLocation, FormProps } from "./types";
import { ILoginModalContentType } from "_/components/LoginModal/types";

function LoginStart({ at = FormLocation.MODAL }: FormProps) {
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
              // pushHistory(<WithEmailLogin />);
              pushHistory(ILoginModalContentType.LOGIN_W_EMAIL);
            }}
          >
            <div className={styles["icon"]}>
              <Person />
            </div>
            Use phone / email / username
          </Link>

          <Tooltip title="Just for testing Firebase though" zIndex={100000} placement="top-start">
            <button className={styles["box"]} onClick={() => {
              console.log("Logging in with Facebook...");

              signInWithFacebook();
            }}>
              <div className={styles["icon"]}>
                <FaFacebook fill="#1877F2" />
              </div>
              Continue with Facebook
            </button>
          </Tooltip>

          <Tooltip title="Just for testing Firebase though" zIndex={100000} placement="top-start">
            <button className={styles["box"]} onClick={() => {
              console.log("Logging in with Google...");
              signInWithGoogle();
            }}>
              <div className={styles["icon"]}>
                <FcGoogle />
              </div>
              Continue with Google
            </button>
          </Tooltip>

          <button className={styles["box"]} disabled>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]} disabled>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]} disabled>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]} disabled>
            <div className={styles["icon"]}>
              <FcGoogle />
            </div>
            Continue with Google
          </button>
          <button className={styles["box"]} disabled>
            <div className={styles["icon"]}>
              <FaTwitter fill="#1DA1F2" />
            </div>
            Continue with Twitter
          </button>
          <button className={styles["box"]} disabled>
            <div className={styles["icon"]}>
              <AiFillApple />
            </div>
            Continue with Apple
          </button>
        </div>
      </div>
      <LoginFooter at={at} />
    </>
  );
}

export default LoginStart;
