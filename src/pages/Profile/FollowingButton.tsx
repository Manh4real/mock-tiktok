import React from "react";

// hooks
import { useFollow } from "_/hooks";

// components
import CustomButton from "_/components/CustomButton";

// hoc
import { withLoginModal } from "_/hoc";

// styles
import styles from "./Profile.module.scss";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

interface Props extends WithLoginModal {
  accountId: number;
}

const FollowingButton = ({ accountId, showLoginModal }: Props) => {
  const isLoggedIn = useIsLoggedIn();

  const [followed, toggleFollow] = useFollow(accountId);

  const handleClick = () => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }

    toggleFollow();
  };

  return (
    <CustomButton
      primary
      style={{
        width: 208,
        height: 36,
      }}
      onClick={handleClick}
      className={styles["button"]}
    >
      {followed ? "Following" : "Follow"}
    </CustomButton>
  );
};

export default withLoginModal(FollowingButton);
