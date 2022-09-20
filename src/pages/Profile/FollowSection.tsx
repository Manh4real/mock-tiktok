import React from "react";
import clsx from "clsx";

// icons
import { BsPersonCheck } from "react-icons/bs";

// components
import CustomButton from "_/components/CustomButton";
import Tooltip from "_/components/Tooltip";
import FollowingButton from "./FollowingButton";

// styles
import styles from "./Profile.module.scss";

// Redux
import { useAppDispatch } from "_/features/hooks";
import {
  unfollowAccountThunk,
  useIsFollowed,
} from "_/features/accounts/accountsSlice";

// types
interface Props {
  accountId: number;
}

const FollowSection = ({ accountId }: Props) => {
  const following = useIsFollowed(accountId);

  // Redux
  const dispatch = useAppDispatch();

  const handleUnfollow = () => {
    dispatch(unfollowAccountThunk(accountId));
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
      <FollowingButton accountId={accountId} />
    </div>
  );
};

export default FollowSection;
