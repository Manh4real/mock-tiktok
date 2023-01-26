import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { To, useNavigate } from "react-router";

// components
import Modal from "_/components/Modal";
import CustomButton from "_/components/CustomButton";
import PhotoFileInput from "./PhotoFileInput";
import UsernameInput from "./UsernameInput";
import NameInput from "./NameInput";
import BioInput from "./BioInput";

// styles
import styles from "./EditProfileModal.module.scss";

// context
import { SubmitProvider, useSubmit } from "_/contexts/submit/updateProfile";

// types
import { Account, ModalProps } from "_/types";
import { ValidationType } from "_/validation/Validation";
import { AllowedInputProperty } from "_/contexts/submit";
import { Spinner } from "_/components/icons";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { updateCurrentUser } from "_/features/currentUser/currentUserSlice";
import { show } from "_/features/alert/alertSlice";

// types
interface Props extends ModalProps {
  account: Account;
}

const EditProfileModal = (props: Props) => {
  return (
    <SubmitProvider>
      <Form {...props} />
    </SubmitProvider>
  );
};

const Form = ({ account, handleClose }: Props) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // submit
  const { isAllGood, isAllowed, setIsAllowed } = useSubmit();
  const [loading, setLoading] = useState<boolean>(false);

  // check if user changed old info
  const isValidToUpdate =
    isAllGood &&
    account &&
    (account.nickname !== isAllowed.username.value ||
      `${account.first_name} ${account.last_name}`.trim() !==
        isAllowed.name.value ||
      account.bio !== isAllowed.bio.value ||
      !!isAllowed.photo.value);

  const handleSubmit = (e: React.MouseEvent) => {
    // login with phone
    if (!isValidToUpdate) {
      e.preventDefault();
      return;
    }

    if(loading) return;

    setLoading(true);

    console.log(isAllowed);

    const name = isAllowed.name.value.split(" ");
    const lastName = name.slice(1).join("");
    const photoFile = isAllowed.photo.value;

    const textBody = {
      nickname: isAllowed.username.value,
      first_name: name[0],
      last_name: lastName,
      bio: isAllowed.bio.value,
    };
    const body = photoFile
      ? {
          ...textBody,
          avatar: photoFile,
        }
      : textBody;

    dispatch(updateCurrentUser(body))
      .unwrap()
      .then((result) => {
        if (!result) return;

        // alert("Updated profile.");
        dispatch(show({ message: "Updated profile." }));

        handleClose(e); // close modal

        // reload page if updated nickname
        navigate(
          result.nickname === account.nickname
            ? (0 as To)
            : "/@" + result.nickname,
          { replace: true }
        );
      })
      .catch(() => {
        // alert(
        //   `Wrong information.
        //   \nMake sure the last name must be at least 2 characters.
        //   \nIf you had, avatar must be a file of type: jpeg, jpg, png, gif.`
        // );

        dispatch(
          show({
            message: `Wrong information. 
                    \nMake sure the last name must be at least 2 characters. 
                    \nIf you had, avatar must be a file of type: jpeg, jpg, png, gif.`,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //
  const setIsAllowed_photo = useCallback(
    ({ value, isValid }: AllowedInputProperty<File>) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.PHOTO]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_username = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.USERNAME]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_name = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.NAME]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_bio = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.BIO]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  // ⚠️ call API or pass through props
  // const [account, setAccount] = useState<Account>();

  // useEffect(() => {
  //   getCurrentUser().then((acc) => {
  //     setAccount(acc);
  //   });
  // }, []);

  if (!account) return null;

  return (
    <Modal handleClose={handleClose}>
      <div className={styles["container"]}>
        <header className={styles["header"]}>Edit profile</header>
        <form
          encType="multipart/form-data"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
          }}
        >
          <div className={styles["table"]}>
            <div className={styles["row"]}>
              <div className={styles["col"]}>
                <div className={styles["label"]}>Profile photo</div>
              </div>
              <div className={styles["col"]}>
                <PhotoFileInput
                  initialValue={account.avatar}
                  setIsAllowed={setIsAllowed_photo}
                />
              </div>
            </div>
            <div className={styles["row"]}>
              <div className={styles["col"]}>
                <div className={styles["label"]}>Username</div>
              </div>
              <div className={styles["col"]}>
                <UsernameInput
                  initialValue={account.nickname}
                  setIsAllowed={setIsAllowed_username}
                />
                <p className={clsx("small-font")}>
                  Usernames can only contain letters, numbers, underscores, and
                  periods. Changing your username will also change your profile
                  link.
                </p>
              </div>
            </div>
            <div className={styles["row"]}>
              <div className={styles["col"]}>
                <div className={styles["label"]}>Name</div>
              </div>
              <div className={styles["col"]}>
                <NameInput
                  initialValue={`${account.first_name} ${account.last_name}`}
                  setIsAllowed={setIsAllowed_name}
                />
              </div>
            </div>
            <div className={styles["row"]}>
              <div className={styles["col"]}>
                <div className={styles["label"]}>Bio</div>
              </div>
              <div className={styles["col"]}>
                <BioInput
                  initialValue={account.bio}
                  setIsAllowed={setIsAllowed_bio}
                />
              </div>
            </div>
          </div>
          <div className={styles["footer"]}>
            <button
              type="button"
              className={clsx("grey-outlined", styles["cancel-button"])}
              onClick={(e: React.MouseEvent) => {
                // clearModal();
                handleClose(e); // close edit modal
              }}
            >
              Cancel
            </button>
            <CustomButton
              style={{ height: 36, minWidth: 96, width: 96 }}
              type="button"
              primary
              disabled={!isValidToUpdate || loading}
              onClick={handleSubmit}
            >
              {loading ? <Spinner style={{ width: 15, height: 15 }} /> : "Save"}
            </CustomButton>
          </div>
        </form>
        <div id={styles["edit-photo"]}></div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
