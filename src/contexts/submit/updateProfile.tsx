import { UpdateProfile, createSubmitContext, formSet } from ".";

export const { provider: SubmitProvider, useSubmit } =
  createSubmitContext<UpdateProfile>(
    formSet.updateProfile,
    (isAllowed) =>
      isAllowed.username.isValid &&
      isAllowed.name.isValid &&
      isAllowed.bio.isValid &&
      (!isAllowed.photo.value || isAllowed.photo.isValid)
  );
