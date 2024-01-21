import { LoginWithPhoneFields, formSet, createSubmitContext } from ".";

export const { provider: SubmitProvider, useSubmit } =
  createSubmitContext<LoginWithPhoneFields>(
    formSet.loginWithPhone,
    (isAllowed) =>
      (isAllowed.phone.isValid && isAllowed.code.isValid) ||
      (isAllowed.phone.isValid && isAllowed.password.isValid)
  );
