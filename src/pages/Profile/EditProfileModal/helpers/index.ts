import { UpdateProfile } from "_/contexts/submit";
import { Account } from "_/types";
import { To } from "react-router-dom";

export function prepareEditSubmitBody(allowedProps: UpdateProfile) {
  const name = allowedProps.name.value.split(" ");
  const lastName = name.slice(1).join("");
  const photoFile = allowedProps.photo.value;

  const textBody = {
    nickname: allowedProps.username.value,
    first_name: name[0],
    last_name: lastName,
    bio: allowedProps.bio.value,
  };
  const body = photoFile
    ? {
        ...textBody,
        avatar: photoFile,
      }
    : textBody;

  return body;
}

export function getProfilePathIfChanged(result: Account, account: Account) {
  return result.nickname === account.nickname
    ? (0 as To)
    : "/@" + result.nickname;
}
