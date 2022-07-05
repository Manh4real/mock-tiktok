import React from "react";

// components
import CustomButton from "_/components/CustomButton";
import Popper from "_/components/Popper";
import Image from "_/components/Image";

// variables
import { PROFILE_MENU_LIST } from "./constants";

// styles
import styles from "./Header.module.scss";

const ProfileButton = () => {
  return (
    <Popper menu={PROFILE_MENU_LIST} hideOnClick={false}>
      <CustomButton className={styles["header__profile"]} unset>
        <Image src="" />
      </CustomButton>
    </Popper>
  );
};

export default ProfileButton;
