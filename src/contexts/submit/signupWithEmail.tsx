import { SignupWithEmail, formSet, createSubmitContext } from ".";

export const { provider: SubmitProvider, useSubmit } =
  createSubmitContext<SignupWithEmail>(
    formSet.signupWithEmail,
    (isAllowed) =>
      isAllowed.email.isValid &&
      isAllowed.password.isValid &&
      isAllowed.code.isValid &&
      isAllowed.birthday.isValid
  );
