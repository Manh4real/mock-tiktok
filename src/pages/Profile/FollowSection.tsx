import React, { useState } from "react";
import clsx from "clsx";

// icons
import { BsPersonCheck } from "react-icons/bs";

// components
import CustomButton from "_/components/CustomButton";
import Tooltip from "_/components/Tooltip";
import FollowingButton from "./FollowingButton";

// services
import { unfollowAccount } from "_/services/account";

// styles
import styles from "./Profile.module.scss";

// types
interface Props {
  accountId: number;
  isFollowing: boolean;
}

const FollowSection = ({ accountId, isFollowing }: Props) => {
  const [following, setFollowing] = useState<boolean>(isFollowing);

  const handleUnfollow = () => {
    unfollowAccount(accountId).then((result: any) => {
      if (result.error) {
        alert("Something went wrong.");
        return;
      }
      setFollowing(false);
    });
  };

  if (following)
    return (
      <div className={styles["follow-section"]}>
        <div className={clsx("flex-align-center", styles["message-unfollow"])}>
          <CustomButton outlined style={{ width: 164 }}>
            Message
          </CustomButton>
          <Tooltip title="Unfollow">
            <button
              className={clsx("flex-center", styles["unfollow-button"])}
              onClick={handleUnfollow}
            >
              <BsPersonCheck />
            </button>
          </Tooltip>
        </div>
      </div>
    );

  return (
    <div className={styles["follow-section"]}>
      <FollowingButton
        accountId={accountId}
        following={following}
        setFollowing_profile={setFollowing}
      />
    </div>
  );
};

export default FollowSection;
