import React, { useEffect, useState } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// types
import Validation, { Birthday, ValidationType } from "_/validation/Validation";
import { SubmitContext__InputProps } from "_/contexts/submit";

interface Props extends SubmitContext__InputProps {}

function BirthdayInput({ setIsAllowed }: Props) {
  const today = new Date();
  const [value, setValue] = useState<Birthday>({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const validate = (value: Birthday) => {
    return new Validation().validate(
      ValidationType.BIRTHDAY,
      JSON.stringify(value)
    );
  };

  const [isValid, setIsValid] = useState<boolean>(validate(value).isValid);

  useEffect(() => {
    setIsValid(validate(value).isValid);
  }, [value]);

  useEffect(() => {
    setIsAllowed({ value: JSON.stringify(value), isValid });
  }, [isValid, setIsAllowed, value]);

  return (
    <div>
      <div className={clsx(styles["row"], styles["form__desc"])}>
        When's your birthday?<small>⚠️ Just for illustration</small>
      </div>

      <div className={clsx(styles["row"], styles["date__selector"])}>
        <div
          className={clsx(
            styles["form__container"],
            styles["form__date-selector"]
          )}
        >
          <select
            className={styles["form__select"]}
            value={+value.month}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue((prev) => {
                return {
                  ...prev,
                  month: Number(e.target.value),
                };
              });
            }}
          >
            <option value="0">Month</option>
            <MonthOptions />
          </select>
        </div>
        <div
          className={clsx(
            styles["form__container"],
            styles["form__date-selector"]
          )}
        >
          <select
            className={styles["form__select"]}
            value={value.day}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue((prev) => {
                return {
                  ...prev,
                  day: e.target.value,
                };
              });
            }}
          >
            <option value="-999">Day</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select>
        </div>
        <div
          className={clsx(
            styles["form__container"],
            styles["form__date-selector"]
          )}
        >
          <select
            className={styles["form__select"]}
            value={value.year}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue((prev) => {
                return {
                  ...prev,
                  year: e.target.value,
                };
              });
            }}
          >
            <option value="-999">Year</option>
            <YearOptions />
          </select>
        </div>
      </div>

      <div className={styles["row"]}>
        <p
          style={{
            fontSize: "14px",
            color: "var(--grey-200)",
            marginBottom: "16px",
            fontWeight: "300",
            lineHeight: "1.7",
          }}
        >
          Your birthday won't be shown publicly.
        </p>
      </div>
    </div>
  );
}

const YearOptions = () => {
  return (
    <>
      {new Array(90).fill("").map((_, index) => {
        const thisYear = new Date().getFullYear();

        return (
          <option key={index} value={`${thisYear - index}`}>
            {thisYear - index}
          </option>
        );
      })}
    </>
  );
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MonthOptions = () => {
  return (
    <>
      <option value="0">Month</option>
      {MONTHS.map((month, index) => {
        return (
          <option key={index} value={index + 1}>
            {month}
          </option>
        );
      })}
    </>
  );
};

export default BirthdayInput;
