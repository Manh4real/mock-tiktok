import React from "react";

// hoc
import { withLoggedIn } from "_/hoc";

// components
import CustomButton from "_/components/CustomButton";

// types
import { WithLoggedIn } from "_/hoc/withLoggedIn";

interface LoginButtonProps extends WithLoggedIn {}
const LoginButton = ({ handleLoggedInFuncClick }: LoginButtonProps) => (
  <CustomButton primary onClick={handleLoggedInFuncClick}>
    Log in
  </CustomButton>
);

export default withLoggedIn(LoginButton);
