import React from "react";

// components
import CustomButton from "_/components/CustomButton";
import { withLoginModal } from "_/hoc";

// styles
import styles from "./FollowButton.module.scss";

// hooks
import { useLoginContext } from "_/contexts/AppContext";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface Props extends WithLoginModal {
  onClick: (e: React.MouseEvent) => void;
}

function FollowButton({ onClick, showLoginModal }: Props) {
  const { isLoggedIn } = useLoginContext();

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showLoginModal();
    }

    onClick(e);
  };

  return (
    <CustomButton primary onClick={handleClick} className={styles["button"]}>
      Follow
    </CustomButton>
  );
}

export default withLoginModal(FollowButton);
