import clsx from "clsx";
import React from "react";

// styles
import styles from "../LoginModal.module.scss";

function BirthdayInput() {
  return (
    <div>
      <div className={clsx(styles["row"], styles["form__desc"])}>
        When's your birthday?
      </div>

      <div className={clsx(styles["row"], styles["date__selector"])}>
        <div
          className={clsx(
            styles["form__container"],
            styles["form__date-selector"]
          )}
        >
          <select className={styles["form__select"]}>
            <option value="0">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div
          className={clsx(
            styles["form__container"],
            styles["form__date-selector"]
          )}
        >
          <select className={styles["form__select"]}>
            <option value="0">Day</option>
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
          <select className={styles["form__select"]}>
            <option value="0">Year</option>
          </select>
        </div>
      </div>

      <div className={styles["row"]}>
        <p style={{ fontSize: "12px", color: "var(--grey-200)" }}>
          Your birthday won't be shown publicly.
        </p>
      </div>
    </div>
  );
}

export default BirthdayInput;
