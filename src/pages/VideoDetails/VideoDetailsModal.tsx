import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { Link, Navigate, To, useNavigate, useParams } from "react-router-dom";

// components
import AccountPopup from "_/components/AccountPopup";
import TimeAgo from "_/components/TimeAgo";
import Image from "_/components/Image";
import Video from "_/components/Video";

import FollowButton from "_/components/Post/FollowButton";
import LikeButton from "_/components/Post/LikeButton";
import CommentButton from "_/components/Post/CommentButton";

import CommentSection from "./components/CommentSection";
import VideoMoreButton from "./components/VideoMoreButton";
import NavButtons from "./NavButtons";
import CopyLinkSection from "./CopyLinkSection";

// icons
// import { BsChevronLeft } from "react-icons/bs";
import { Close, MusicNote } from "_/components/icons";

// styles
import styles from "./VideoDetails.module.scss";

// hooks
import { useBackgroundLocation } from "_/hooks";

// config
import routes from "_/config/routes";

// context
import { CommentCommandProvider, useCommentCommandContext } from "_/contexts";

// Redux
import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";
import { useVideoById } from "_/features/videos/videosSlice";

// utils
import { toTag } from "_/utils";

// helpers
import { overflowBodyHidden } from "_/helpers";

function VideoDetailsModal() {
  const navigate = useNavigate();
  const { backgroundLocation } = useBackgroundLocation();

  const params = useParams();
  const videoId = params.videoId;

  const currentUserInfo = useCurrentUserInfo();

  const back = useCallback(() => {
    navigate(backgroundLocation ? (-1 as To) : routes.root);

    overflowBodyHidden(false);
  }, [backgroundLocation, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [back]);

  // Redux
  const video = useVideoById(videoId === undefined ? -1 : videoId);

  if (!video) {
    return <Navigate to={"/video/" + videoId} state={null} replace={true} />;
  }

  const author = video.user;
  const authorName =
    author.full_name || `${author.first_name} ${author.last_name}`;

  return ReactDOM.createPortal(
    <div className={styles["container"]}>
      <div className={styles["left"]}>
        <div className={styles["video-container"]}>
          <Video
            key={video.id}
            postId={video.id}
            src={video.file_url}
            autoPlay={true}
            placeholder={video.thumb_url}
          />
        </div>
        <div
          className={styles["background"]}
          style={{
            backgroundImage: `url(${video.thumb_url})`,
          }}
        ></div>

        <NavButtons videoId={video.id} />
      </div>
      <CommentCommandProvider
        key={video.uuid}
        initialCommentsCount={video.comments_count}
        videoId={video.id}
        video_uuid={video.uuid}
      >
        <div className={styles["right"]}>
          <header className={styles["header"]}>
            <AccountPopup account={author}>
              <Link
                to={"/@" + author.nickname}
                className={clsx(styles["header-link"], "flex-align-center")}
              >
                <div className={styles["avatar"]}>
                  <Image src={author.avatar} className={clsx("circle")} />
                </div>
                <div>
                  <h3
                    className={clsx(
                      styles["author-username"],
                      "hover-underlined"
                    )}
                  >
                    {author.nickname}
                  </h3>
                  <div className={styles["subtitle"]}>
                    <span className={styles["author-name"]}>{authorName}</span>
                    <span style={{ marginInline: 5 }}>&middot;</span>
                    <TimeAgo time={video.created_at} />
                  </div>
                </div>
              </Link>
            </AccountPopup>
            {currentUserInfo?.id === video.user_id && (
              <VideoMoreButton
                // at="modal"
                videoId={video.id}
                byCurrentUser={currentUserInfo?.id === video.user_id}
              />
            )}
            {currentUserInfo?.id !== video.user_id && (
              <div className={styles["follow-button"]}>
                <FollowButton styles={styles} accountId={author.id} />
              </div>
            )}
          </header>
          <div className={styles["content"]}>
            <div className={styles["desc"]}>{toTag(video.description)}</div>
            <div className={styles["audio"]}>
              <h4>
                <Link
                  to={video.music || "/"}
                  className="hover-underlined flex-align-center"
                  style={{ width: "max-content" }}
                >
                  <MusicNote />
                  <span style={{ marginLeft: "5px" }}>
                    original sound - {authorName}
                  </span>
                </Link>
              </h4>
            </div>
            <div className={styles["interaction"]}>
              <div className={clsx("flex-align-center", styles["buttons"])}>
                <LikeButton
                  isLiked={video.is_liked}
                  styles={styles}
                  postId={video.id}
                  likesCount={video.likes_count}
                />
                <CommentButtonWithContext
                  disabled
                  styles={styles}
                  postId={video.id}
                  commentsCount={video.comments_count}
                />
              </div>
            </div>
            <CopyLinkSection />
          </div>
          <CommentSection
            authorId={video.user_id}
            videoId={video.id}
            video_uuid={video.uuid}
            isAllowed={video.allows.some((a) => a === "comment")}
          />
        </div>
      </CommentCommandProvider>
      <button
        className={clsx(styles["basic-button"], styles["closeBtn"])}
        onClick={() => {
          back();
        }}
      >
        <Close />
      </button>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}

// ====================================================================
interface CommentButtonWithContextProps {
  disabled: boolean;
  styles: {
    readonly [key: string]: string;
  };
  postId: number;
  commentsCount: number;
}
export const CommentButtonWithContext = ({
  disabled,
  styles,
  postId,
}: CommentButtonWithContextProps) => {
  const { commentsCount } = useCommentCommandContext();

  return (
    <CommentButton
      disabled={disabled}
      styles={styles}
      postId={postId}
      commentsCount={commentsCount}
    />
  );
};

export default VideoDetailsModal;
