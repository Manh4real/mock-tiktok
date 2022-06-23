import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import { FiMoreVertical } from "react-icons/fi";

import {
  Logo,
  Plus,
  PaperPlane,
  Inbox,
  Language,
  QuestionMark,
  RoundedKeyboard,
} from "_/components/icons";

import SearchBar from "./Search";
import CustomButton from "_/components/CustomButton";
import Popper from "_/components/Popper";

import styles from "./Header.module.scss";

interface Props {
  isFullWidth: boolean;
}

function Header({ isFullWidth }: Props) {
  return (
    <div className={styles["header__container"]}>
      <div
        className={clsx(styles["header"], {
          [styles["header--fullWidth"]]: isFullWidth,
        })}
      >
        <Link to="/" className={styles["header__logo"]}>
          <Logo />
        </Link>
        <SearchBar />
        <div className={styles["header__rightContainer"]}>
          <Link to="/upload" className={styles["header__upload"]}>
            <Plus /> Upload
          </Link>
          {/* <LoggedInSection /> */}
          <CustomButton primary>Log in</CustomButton>

          <More />
        </div>
      </div>
    </div>
  );
}

const MorePopup = () => {
  return (
    <Popper>
      <ul className={styles["more-popup"]}>
        <li>
          <Language /> English
        </li>
        <li>
          <QuestionMark /> Feedback and help
        </li>
        <li>
          <RoundedKeyboard /> Keyboard shortcuts
        </li>
      </ul>
    </Popper>
  );
};

const More = () => {
  return (
    <Tippy
      interactive={true}
      placement="bottom-end"
      delay={[0, 800]}
      content={<MorePopup />}
    >
      <CustomButton unset>
        <FiMoreVertical />
      </CustomButton>
    </Tippy>
  );
};

const LoggedInSection = () => {
  return (
    <>
      <Link to="/message" className={styles["header__message"]}>
        <PaperPlane />
      </Link>
      <button className={styles["header__inbox"]}>
        <Inbox />
      </button>
      <button className={styles["header__profile"]}>Profile</button>
    </>
  );
};

export default Header;
