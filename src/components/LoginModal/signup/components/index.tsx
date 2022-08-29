import React from "react";

interface DescProps {
  onClick: () => void;
}

export const PhoneSignupDesc = ({ onClick }: DescProps) => {
  return (
    <React.Fragment>
      Phone
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        Sign up with email
      </a>
    </React.Fragment>
  );
};

export const EmailSignupDesc = ({ onClick }: DescProps) => {
  return (
    <React.Fragment>
      Email
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        Sign up with phone
      </a>
    </React.Fragment>
  );
};
