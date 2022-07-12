import React, { useContext } from "react";

// components
import CustomButton from "_/components/CustomButton";
import { withLoggedIn } from "_/hoc";

// styles
import styles from "./FollowButton.module.scss";

// context
import { LoginContext } from "_/App";

// types
import { WithLoggedIn } from "_/hoc/withLoggedIn";

interface Props extends WithLoggedIn {
  onClick: (e: React.MouseEvent) => void;
}

function FollowButton({ onClick, handleLoggedInFuncClick }: Props) {
  const { isLoggedIn } = useContext(LoginContext);

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      handleLoggedInFuncClick();
    }

    onClick(e);
  };

  return (
    <CustomButton primary onClick={handleClick} className={styles["button"]}>
      Follow
    </CustomButton>
  );
}

export default withLoggedIn(FollowButton);
