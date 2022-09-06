import React, { useEffect } from "react";

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
  following: boolean;
  setFollowing_profile: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowingButton = ({
  accountId,
  following,
  setFollowing_profile,
  showLoginModal,
}: Props) => {
  const isLoggedIn = useIsLoggedIn();

  const [followed, toggleFollow] = useFollow(following, accountId);

  const handleClick = () => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
    toggleFollow();
  };

  useEffect(() => {
    setFollowing_profile(followed);
  }, [followed, setFollowing_profile]);

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
