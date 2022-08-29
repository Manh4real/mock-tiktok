import React, { useContext, useState } from "react";
import { SubmitContextValue, LoginWithEmailFields, formSet } from ".";

export const Submit = React.createContext<
  SubmitContextValue<LoginWithEmailFields>
>({
  isAllowed: formSet.loginWithEmail,
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
  const [isAllowed, setIsAllowed] = useState<LoginWithEmailFields>(
    formSet.loginWithEmail
  );

  const isAllGood =
    (isAllowed.email.isValid && isAllowed.password.isValid) ||
    (isAllowed.username.isValid && isAllowed.password.isValid);

  return (
    <Submit.Provider value={{ isAllowed, setIsAllowed, isAllGood }}>
      {children}
    </Submit.Provider>
  );
};
