import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// icons
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Person } from "_/components/icons";
import { AiFillApple } from "react-icons/ai";

// components
import Tooltip from "_/components/Tooltip";

// config
import routes from "_/config/routes";

// hooks
import { useRedirect } from "_/hooks";

// styles
import styles from "./Login.module.scss";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

// firebase
import { signInWithGoogle, signInWithFacebook } from "_/firebase";

const Login = () => {
  const { redirectSearchParamString: redirectSearchParams, redirect } =
    useRedirect();

  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) redirect();
  }, [isLoggedIn, redirect]);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["content-wrapper"]}>
            <div className={styles["title"]}>Log in to TikTok</div>
            <p className={styles["desc"]}>
              Manage your account, check notifications, comment on videos, and
              more.
            </p>
            <div className={styles["boxes"]}>
              <Link
                to={routes.login + "/phone" + redirectSearchParams}
                className={styles["box"]}
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
          <div className={styles["footer"]}>
            <div className={styles["footer__text"]}>
              Don't have an account
              <Link
                to={routes.signup + redirectSearchParams}
                replace={true}
                className="pink-font"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
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
    </div>
  );
};

export default Login;
