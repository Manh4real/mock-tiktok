import React, { useContext, useState } from "react";
import {
  SubmitContextValue,
  UpdateProfile,
  createSubmitProvider,
  formSet,
} from ".";

export const Submit = React.createContext<SubmitContextValue<UpdateProfile>>({
  isAllowed: formSet.updateProfile,
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
//   const [isAllowed, setIsAllowed] = useState<UpdateProfile>(
//     formSet.updateProfile
//   );

//   const isAllGood =
//     isAllowed.username.isValid &&
//     isAllowed.name.isValid &&
//     isAllowed.bio.isValid &&
//     (!isAllowed.photo.value || isAllowed.photo.isValid);

//   return (
//     <Submit.Provider value={{ isAllowed, setIsAllowed, isAllGood }}>
//       {children}
//     </Submit.Provider>
//   );
// };

export const SubmitProvider = createSubmitProvider<UpdateProfile>(
  formSet.updateProfile,
  (isAllowed) =>
    isAllowed.username.isValid &&
    isAllowed.name.isValid &&
    isAllowed.bio.isValid &&
    (!isAllowed.photo.value || isAllowed.photo.isValid)
);
