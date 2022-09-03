import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

// styles
import styles from "./Upload.module.scss";

// context
import { useSubmit } from "_/contexts/submit/upload";

// types
import { ViewerPermission as ViewerPermissionType } from "_/types";

interface Props {
  setIsAllowed: (value: ViewerPermissionType) => void;
}

interface State {
  comment: boolean;
  duet: boolean;
  stitch: boolean;
}

//
const initialValue = {
  comment: true,
  duet: true,
  stitch: true,
};

const ViewerPermission = ({ setIsAllowed }: Props) => {
  const [value, setValue] = useState<State>(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, []);

  //=====================================================
  const { createNewDiscardObserver } = useSubmit();

  useEffect(() => {
    createNewDiscardObserver({ reset });
  }, [createNewDiscardObserver, reset]);
  //=====================================================

  //
  useEffect(() => {
    const a = Object.entries(value)
      .filter(([, checked]) => checked)
      .map(([key]) => {
        return key;
      });

    setIsAllowed(a as ViewerPermissionType);
  }, [value, setIsAllowed]);

  return (
    <div className={styles["form__field"]}>
      <div className={clsx(styles["form__title"])}>Allow users to:</div>
      <div className={clsx(styles["form__checkboxes-container"])}>
        <div className={clsx(styles["form__checkbox"])}>
          <input
            type="checkbox"
            name="allow-comment"
            id="allow-comment"
            checked={value.comment}
            onChange={() => {
              setValue((prev) => ({ ...prev, comment: !prev.comment }));
            }}
          />
          <label htmlFor="allow-comment">Comment</label>
        </div>
        <div className={styles["form__checkbox"]}>
          <input
            type="checkbox"
            name="allow-duet"
            id="allow-duet"
            checked={value.duet}
            onChange={() => {
              setValue((prev) => ({ ...prev, duet: !prev.duet }));
            }}
          />
          <label htmlFor="allow-duet">Duet</label>
        </div>
        <div className={styles["form__checkbox"]}>
          <input
            type="checkbox"
            name="allow-stitch"
            id="allow-stitch"
            checked={value.stitch}
            onChange={() => {
              setValue((prev) => ({ ...prev, stitch: !prev.stitch }));
            }}
          />
          <label htmlFor="allow-stitch">Stitch</label>
        </div>
      </div>
    </div>
  );
};

export default ViewerPermission;
