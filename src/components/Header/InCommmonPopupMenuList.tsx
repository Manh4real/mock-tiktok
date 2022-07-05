import React from "react";

// icons
import { Language, QuestionMark, RoundedKeyboard } from "_/components/icons";

// components
import CustomButton from "_/components/CustomButton";

// styles
import styles from "./Header.module.scss";

const InCommmonPopupMenuList = () => {
  return (
    <React.Fragment>
      <li>
        <CustomButton className={styles["menu-popup__item"]}>
          <React.Fragment>
            <Language /> English
          </React.Fragment>
        </CustomButton>
      </li>
      <li>
        <a href="/feedback" className={styles["menu-popup__item"]}>
          <QuestionMark /> Feedback and help
        </a>
      </li>
      <li>
        <CustomButton className={styles["menu-popup__item"]}>
          <React.Fragment>
            <RoundedKeyboard /> Keyboard shortcuts
          </React.Fragment>
        </CustomButton>
      </li>
    </React.Fragment>
  );
};

export default InCommmonPopupMenuList;
