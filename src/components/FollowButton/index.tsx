import React from "react";
import clsx from "clsx";

// components
import CustomButton from "_/components/CustomButton";
import { withLoginModal } from "_/hoc";

// styles
import styles from "./FollowButton.module.scss";

// hooks
import { useFollow } from "_/hooks";
import { useLoginContext } from "_/contexts/AppContext";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface Props extends WithLoginModal {
  isFollowed: boolean;
  accountId: number;
  style?: React.CSSProperties;
}

function FollowButton({ isFollowed, accountId, showLoginModal, style }: Props) {
  const { isLoggedIn } = useLoginContext();

  const [followed, toggleFollow] = useFollow(isFollowed, accountId);

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showLoginModal();
      return;
    }

    toggleFollow();
  };

  return (
    <CustomButton
      primary
      style={style}
      onClick={handleClick}
      className={clsx(styles["button"], {
        [styles["is--following"]]: followed,
      })}
    >
      {followed ? "Following" : "Follow"}
    </CustomButton>
  );
}

export default withLoginModal(FollowButton);
