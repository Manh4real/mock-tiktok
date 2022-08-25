import React from "react";

// styles

// components
import {
  EmailInput,
  PasswordInput,
  CodeInput,
} from "_/components/LoginModal/form-elements";

// context

function WithEmailSignup() {
  return (
    <>
      <EmailInput />
      <PasswordInput setIsAllowed={() => {}} />
      <CodeInput disabled={true} setIsAllowed={() => {}} />
    </>
  );
}

export default WithEmailSignup;
