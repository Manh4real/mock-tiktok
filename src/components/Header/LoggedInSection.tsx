import React from "react";
import { Link } from "react-router-dom";

// icons
import { PaperPlane, Inbox } from "_/components/icons";

// components
import ProfileButton from "./ProfileButton";
import Tooltip from "_/components/Tooltip";

// styles
import styles from "./Header.module.scss";
import "tippy.js/dist/tippy.css";

const LoggedInSection = () => {
  return (
    <>
      <Tooltip title="Message">
        <Link to="/message" className={styles["header__message"]}>
          <PaperPlane />
        </Link>
      </Tooltip>
      <Tooltip title="Inbox">
        <button className={styles["header__inbox"]}>
          <Inbox />
        </button>
      </Tooltip>
      <ProfileButton />
    </>
  );
};

export default LoggedInSection;
