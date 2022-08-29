import React from "react";

// components
import CustomButton from "_/components/CustomButton";
import Popper from "_/components/Popper";
import Image from "_/components/Image";

// variables
import { PROFILE_MENU_LIST } from "./constants";

// icons
import { CgProfile } from "react-icons/cg";

// context
import { useLoginContext } from "_/contexts";

// styles
import styles from "./Header.module.scss";

const ProfileButton = () => {
  const { currentUser } = useLoginContext();

  return (
    <Popper
      menu={[
        {
          icon: <CgProfile />,
          to:
            "/@" +
            ((currentUser && currentUser.info.data.nickname) || "unknown"),
          title: "View profile",
        },
        ...PROFILE_MENU_LIST,
      ]}
      hideOnClick={false}
    >
      <CustomButton className={styles["header__profile"]} unset>
        <Image src="" />
      </CustomButton>
    </Popper>
  );
};

export default ProfileButton;
