import React from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// components
import CustomButton from "_/components/CustomButton";
import {
  PhoneInput,
  CodeInput,
  BirthdayInput,
} from "_/components/LoginModal/form-elements";
import { PhoneSignupDesc } from "./components";

// types
import { FormLocation } from "../types";

interface Props {
  at: FormLocation;
  toggleToEmail: () => void;
}

function WithPhoneSignup({ toggleToEmail }: Props) {
  return (
    <>
      <BirthdayInput setIsAllowed={() => {}} />
      <div className={clsx(styles["row"], styles["form__desc"])}>
        <PhoneSignupDesc onClick={toggleToEmail} />
      </div>
      <PhoneInput setIsAllowed={() => {}} />
      <CodeInput disabled={true} setIsAllowed={() => {}} />
      <CustomButton
        primary
        large
        className={clsx(styles["row"], styles["submit-button"])}
      >
        Next
      </CustomButton>
    </>
  );
}

export default WithPhoneSignup;
