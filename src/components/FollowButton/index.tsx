import React from "react";

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
import clsx from "clsx";

interface Props extends WithLoginModal {
  isFollowed: boolean;
  accountId: number;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

function FollowButton({
  isFollowed,
  accountId,
  onClick = () => {},
  showLoginModal,
  style,
}: Props) {
  const { isLoggedIn } = useLoginContext();

  const [followed, toggleFollow] = useFollow(isFollowed, accountId);

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showLoginModal();
    }

    // onClick(e);
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
