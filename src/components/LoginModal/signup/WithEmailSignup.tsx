import React, { useState, useCallback } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// icons
import { Spinner } from "_/components/icons";

// components
import CustomButton from "_/components/CustomButton";
import {
  EmailInput,
  PasswordInput,
  CodeInput,
  BirthdayInput,
} from "_/components/LoginModal/form-elements";
import { EmailSignupDesc } from "./components";

// context
import { SubmitProvider } from "_/contexts/submit/signupWithEmail";
import { useSubmit } from "_/contexts/submit/signupWithEmail";

// services
import { signup } from "_/services/auth";

// context
import { useModalContext } from "_/contexts";
import { CurrentUser, useLoginContext } from "_/contexts";

// types
import { AllowedInputProperty } from "_/contexts/submit";
import { ValidationType } from "_/validation/Validation";
import { FormLocation } from "../types";

interface Props {
  at: FormLocation;
  toggleToEmail: () => void;
}

function WithEmailSignup(props: Props) {
  return (
    <SubmitProvider>
      <Form {...props} />
    </SubmitProvider>
  );
}

const Form = ({ at, toggleToEmail }: Props) => {
  const { clearModal } = useModalContext();
  const { setCurrentUserInfo } = useLoginContext();

  // submit
  const { isAllGood, isAllowed, setIsAllowed } = useSubmit();

  const [loading, setLoading] = useState<boolean>(false);

  //
  const handleSubmit = (e: React.MouseEvent) => {
    // login with phone
    if (!isAllGood) {
      e.preventDefault();
      return;
    }

    setLoading(true);

    //
    signup(isAllowed.email.value, isAllowed.password.value)
      .then((result: CurrentUser["info"]) => {
        if (at === FormLocation.MODAL) clearModal();

        alert("Signed up.");
        setCurrentUserInfo(result);
      })
      .catch(() => {
        alert("This email has been used.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setIsAllowed_email = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.EMAIL]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_password = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.PASSWORD]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_code = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.CODE]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );
  const setIsAllowed_birthday = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.BIRTHDAY]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );
  return (
    <>
      <BirthdayInput setIsAllowed={setIsAllowed_birthday} />
      <div className={clsx(styles["row"], styles["form__desc"])}>
        <EmailSignupDesc onClick={toggleToEmail} />
      </div>
      <EmailInput setIsAllowed={setIsAllowed_email} />
      <PasswordInput setIsAllowed={setIsAllowed_password} />
      <CodeInput
        disabled={
          !(
            isAllowed.email.isValid &&
            isAllowed.password.isValid &&
            isAllowed.birthday.isValid
          )
        }
        setIsAllowed={setIsAllowed_code}
      />
      <div className={styles["row"]}>
        <div className={styles["form__checkbox"]}>
          <input type="checkbox" id="cb" />
          <label htmlFor="cb" className={styles["form__label"]}>
            Get trending content, newsletters, promotions, recommendations, and
            account updates sent to your email
          </label>
        </div>
      </div>
      <CustomButton
        primary
        large
        disabled={!isAllGood}
        className={clsx(styles["row"], styles["submit-button"])}
        onClick={handleSubmit}
      >
        {loading ? (
          <Spinner style={{ width: "15px", height: "15px", color: "#fff" }} />
        ) : (
          "Next"
        )}
      </CustomButton>
    </>
  );
};

export default WithEmailSignup;
