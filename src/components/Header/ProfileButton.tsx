import React from "react";

// components
import CustomButton from "_/components/CustomButton";
import Popper from "_/components/Popper";
import Image from "_/components/Image";

// variables
import { PROFILE_MENU_LIST } from "./constants";

// icons
import { CgProfile } from "react-icons/cg";

// Redux
import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";

// styles
import styles from "./Header.module.scss";

const ProfileButton = () => {
  const currentUserInfo = useCurrentUserInfo();

  return (
    <Popper
      menu={[
        {
          icon: <CgProfile />,
          to:
            "/@" + ((currentUserInfo && currentUserInfo.nickname) || "unknown"),
          title: "View profile",
        },
        ...PROFILE_MENU_LIST,
      ]}
      hideOnClick={false}
    >
      <CustomButton className={styles["header__profile"]} unset>
        <Image src={currentUserInfo?.avatar || ""} />
      </CustomButton>
    </Popper>
  );
};

export default ProfileButton;
