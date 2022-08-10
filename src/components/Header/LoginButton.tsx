import React from "react";

// hoc
import { withLoginModal } from "_/hoc";

// components
import CustomButton from "_/components/CustomButton";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

interface LoginButtonProps extends WithLoginModal {}
const LoginButton = ({ showLoginModal }: LoginButtonProps) => (
  <CustomButton primary onClick={showLoginModal}>
    Log in
  </CustomButton>
);

export default withLoginModal(LoginButton);
