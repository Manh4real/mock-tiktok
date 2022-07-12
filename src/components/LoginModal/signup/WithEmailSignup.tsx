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
      <PasswordInput />
      <CodeInput />
    </>
  );
}

export default WithEmailSignup;
