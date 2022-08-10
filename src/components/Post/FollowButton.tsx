import React from "react";

// components
import CustomButton from "_/components/CustomButton";
import { withLoginModal } from "_/hoc";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface Props extends WithLoginModal {}

function FollowButton({ showLoginModal }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    showLoginModal();
  };

  return (
    <CustomButton
      outlined
      style={{ minHeight: 28, height: 28 }}
      onClick={handleClick}
    >
      Follow
    </CustomButton>
  );
}

export default withLoginModal(FollowButton);
