import React from "react";
import clsx from "clsx";

// components
import CustomButton from "_/components/CustomButton";
import { useLoginContext } from "_/contexts";
import { withLoginModal } from "_/hoc";

// hooks
import { useFollow } from "_/hooks";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface Props extends WithLoginModal {
  styles: {
    readonly [key: string]: string;
  };
  accountId: number;
  isFollowed: boolean;
}

function FollowButton({
  styles,
  accountId,
  isFollowed,
  showLoginModal,
}: Props) {
  const [followed, toggleFollow] = useFollow(isFollowed, accountId);

  const { isLoggedIn } = useLoginContext();

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }

    toggleFollow();
  };

  return (
    <CustomButton
      className={clsx({
        [styles["is--following"]]: followed,
      })}
      outlined
      style={{
        minHeight: 28,
        height: 28,
      }}
      onClick={handleClick}
    >
      {followed ? "Following" : "Follow"}
    </CustomButton>
  );
}

export default withLoginModal(FollowButton);
