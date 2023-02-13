import React from "react";
import clsx from "clsx";
// import { To } from "react-router-dom";

// icons
import { FiTrash2 } from "react-icons/fi";

// styles
import styles from "../VideoDetails.module.scss";

// services
import { deleteVideo as api_deleteVideo } from "_/services/video";
import { useNavigate } from "react-router";

// helpers
import { overflowBodyHidden } from "_/helpers";

// hooks
// import { useBackgroundLocation } from "_/hooks";

// config
// import routes from "_/config/routes";

// Redux
import { deleteVideo as redux_deleteVideo } from "_/features/videos/videosSlice";
import { useAppDispatch } from "_/features/hooks";

// types
// import { ILocationState } from "_/types";
interface Props {
  videoId: number;
  // at: "modal" | "page"
}

const DeleteVideoButton = ({ videoId }: Props) => {
  const navigate = useNavigate();
  // const { backgroundLocation } = useBackgroundLocation();

  // const removeModal = () => {
    // const locationState: ILocationState = {
    //     action: "deleted"
    // };

    // console.log("backgroundLocation", backgroundLocation, locationState)
    // // (-1 as To)
    // // backgroundLocation.pathname
    // navigate(backgroundLocation ? backgroundLocation.pathname : routes.root, { 
    //   state: locationState
    // });
  // }

  const back = () => {
    navigate(`/video/${videoId}`, { replace: true });
  }

  const dispatch = useAppDispatch();

  const handleClick = () => {
    const answer = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!answer) return;

    api_deleteVideo(videoId).then(() => {
      dispatch(redux_deleteVideo(videoId));

      // if(at === "modal") {
      //   removeModal();
      // } else {
      //   back();
      // }
      back();
      overflowBodyHidden(false);
    });
  };

  return (
    <div
      role={"button"}
      className={clsx(
        "button",
        "flex-align-center",
        styles["delete-video-button"],
        styles["row"]
      )}
      onClick={handleClick}
    >
      <FiTrash2 size={24} />
      <span>Delete</span>
    </div>
  );
};

export default DeleteVideoButton;
