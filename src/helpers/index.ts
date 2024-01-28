import { Account } from "_/types";

export function overflowBodyHidden(value: boolean) {
  if (value === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.overflow = "overlay";
  }
}

export function getAccountName(account: Account) {
  return account.full_name || `${account.first_name} ${account.last_name}`;
}
