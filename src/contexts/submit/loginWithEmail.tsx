import React from "react";
import { LoginWithEmailFields, formSet, createSubmitContext } from ".";

export const { provider: SubmitProvider, useSubmit } =
  createSubmitContext<LoginWithEmailFields>(
    formSet.loginWithEmail,
    (isAllowed) =>
      (isAllowed.email.isValid && isAllowed.password.isValid) ||
      (isAllowed.username.isValid && isAllowed.password.isValid)
  );
