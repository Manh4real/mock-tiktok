import React from "react";

// styles

// components
import { PhoneInput, CodeInput } from "_/components/LoginModal/form-elements";

// context

function WithPhoneSignup() {
  return (
    <>
      <PhoneInput />
      <CodeInput />
    </>
  );
}

export default WithPhoneSignup;
