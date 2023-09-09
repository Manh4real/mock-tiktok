import React, { useContext, useState } from "react";
import {
  SubmitContextValue,
  LoginWithPhoneFields,
  formSet,
  createSubmitProvider,
} from ".";

export const Submit = React.createContext<
  SubmitContextValue<LoginWithPhoneFields>
>({
  isAllowed: formSet.loginWithPhone,
  setIsAllowed: () => {},
  isAllGood: false,
});

export const useSubmit = () => {
  return useContext(Submit);
};

// interface Props {
//   children: JSX.Element;
// }
// export const SubmitProvider = ({ children }: Props) => {
//   const [isAllowed, setIsAllowed] = useState<LoginWithPhoneFields>(
//     formSet.loginWithPhone
//   );

//   const isAllGood =
//     (isAllowed.phone.isValid && isAllowed.code.isValid) ||
//     (isAllowed.phone.isValid && isAllowed.password.isValid);

//   return (
//     <Submit.Provider value={{ isAllowed, setIsAllowed, isAllGood }}>
//       {children}
//     </Submit.Provider>
//   );
// };

export const SubmitProvider = createSubmitProvider<LoginWithPhoneFields>(
  formSet.loginWithPhone,
  (isAllowed) =>
    (isAllowed.phone.isValid && isAllowed.code.isValid) ||
    (isAllowed.phone.isValid && isAllowed.password.isValid)
);
