import React, { useState } from "react";
import { Link } from "react-router-dom";

// icons
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Person } from "_/components/icons";
import { AiFillApple } from "react-icons/ai";

import { BsChevronDown } from "react-icons/bs";

// components
import Tooltip from "_/components/Tooltip";

// config
import routes from "_/config/routes";

// hooks
import { useRedirect } from "_/hooks";

// styles
import styles from "../Login/Login.module.scss";

// firebase
import { signInWithGoogle, signInWithFacebook } from "_/firebase";

const Signup = () => {
  const { redirectSearchParamString: redirectSearchParams } = useRedirect();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleMoreButtonClick = () => {
    setExpanded(true);
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["content-wrapper"]}>
            <div className={styles["title"]}>Sign up for TikTok</div>
            <p className={styles["desc"]}>
              Create a profile, follow other accounts, make your own videos, and
              more.
            </p>
            <div className={styles["boxes"]}>
              <Link
                to={routes.signup + "/phone-email" + redirectSearchParams}
                className={styles["box"]}
              >
                <div className={styles["icon"]}>
                  <Person />
                </div>
                Use phone or email
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

              {expanded && (
                <>
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
                </>
              )}
              {!expanded && (
                <div
                  className={styles["more-btn"]}
                  onClick={handleMoreButtonClick}
                >
                  <span className={styles["more-btn__icon"]}>
                    <BsChevronDown width="1em" height="1em" />
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={styles["footer"]}>
            <p className={styles["para-text"]}>
              By continuing, you agree to TikTok's
              <Link to="/">Terms of Service</Link> and confirm that you have
              read TikTok's <Link to="/">Privacy Policy</Link>.
            </p>
            <div className={styles["footer__text"]}>
              Already have an account?
              <Link
                to={routes.login + redirectSearchParams}
                replace={true}
                className="pink-font"
              >
                Log in
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

export default Signup;
