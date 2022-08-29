import React, { useContext, useState } from "react";
import { SubmitContextValue, SignupWithEmail, formSet } from ".";

export const Submit = React.createContext<SubmitContextValue<SignupWithEmail>>({
  isAllowed: formSet.signupWithEmail,
  setIsAllowed: () => {},
  isAllGood: false,
});

export const useSubmit = () => {
  return useContext(Submit);
};

interface Props {
  children: JSX.Element;
}
export const SubmitProvider = ({ children }: Props) => {
  const [isAllowed, setIsAllowed] = useState<SignupWithEmail>(
    formSet.signupWithEmail
  );

  const isAllGood =
    isAllowed.email.isValid &&
    isAllowed.password.isValid &&
    isAllowed.code.isValid &&
    isAllowed.birthday.isValid;

  return (
    <Submit.Provider value={{ isAllowed, setIsAllowed, isAllGood }}>
      {children}
    </Submit.Provider>
  );
};
