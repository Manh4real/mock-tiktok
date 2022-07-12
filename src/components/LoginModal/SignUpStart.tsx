import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Person } from "_/components/icons";
import { AiFillApple } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

// components
import { SignupFooter } from "./signup";

// styles
import styles from "./LoginModal.module.scss";

// components
import { PhoneEmailSignup } from "./signup";

// context
import { History } from ".";

function SignUpStart() {
  const { pushHistory } = useContext(History);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleMoreButtonClick = () => {
    setExpanded(true);
  };

  return (
    <>
      <div className={styles["content-wrapper"]}>
        <div className={styles["title"]}>Sign up for TikTok</div>
        <div className={styles["boxes"]}>
          <Link
            to="/"
            className={styles["box"]}
            onClick={() => pushHistory(<PhoneEmailSignup />)}
          >
            <div className={styles["icon"]}>
              <Person />
            </div>
            Use phone or email
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
          {expanded && (
            <>
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
            </>
          )}
          {!expanded && (
            <div className={styles["more-btn"]} onClick={handleMoreButtonClick}>
              <span className={styles["more-btn__icon"]}>
                <BsChevronDown width="1em" height="1em" />
              </span>
            </div>
          )}
        </div>
      </div>
      <SignupFooter />
    </>
  );
}

export default SignUpStart;
