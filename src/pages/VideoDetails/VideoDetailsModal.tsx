import React from "react";
import clsx from "clsx";
import ReactDOM from "react-dom";
import {
  Link,
  Location,
  To,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

// components
import Video from "_/components/Video";
import AccountPopup from "_/components/AccountPopup";
import TimeAgo from "_/components/TimeAgo";
import Image from "_/components/Image";

import FollowButton from "_/components/Post/FollowButton";
import LikeButton from "_/components/Post/LikeButton";
import CommentButton from "_/components/Post/CommentButton";

import CommentSection from "./components/CommentSection";
import VideoMoreButton from "./components/VideoMoreButton";
import NavButtons from "./NavButtons";

// icons
import { BsChevronLeft } from "react-icons/bs";
import { Close, MusicNote } from "_/components/icons";

// pages
import { UnavailableVideoPage } from "_/pages";

// styles
import styles from "./VideoDetails.module.scss";

// config
import routes from "_/config/routes";

// Redux
import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";
import { useVideoById } from "_/features/videos/videosSlice";

function VideoDetailsModal() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { background: Location } | null;
  const locationBackground = locationState?.background;

  const params = useParams();
  const videoId = params.videoId;

  const currentUserInfo = useCurrentUserInfo();

  // Redux
  const video = useVideoById(videoId === undefined ? -1 : videoId);

  if (!video) return <UnavailableVideoPage />;

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
            hasWindowHeight={true}
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
            <VideoMoreButton videoId={video.id} />
          )}
          {currentUserInfo?.id !== video.user_id && (
            <div className={styles["follow-button"]}>
              <FollowButton
                styles={styles}
                accountId={author.id}
                isFollowed={author.is_followed}
              />
            </div>
          )}
        </header>

        <div className={styles["content"]}>
          <div className={styles["desc"]}>{video.description}</div>

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
              <CommentButton
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
          videoId={video.id}
          video_uuid={video.uuid}
          isAllowed={video.allows.some((a) => a === "comment")}
        />
      </div>
      <button
        className={clsx(styles["basic-button"], styles["closeBtn"])}
        onClick={() => {
          navigate(locationBackground ? (-1 as To) : routes.root);

          document.body.style.overflow = "overlay";
        }}
      >
        {locationBackground ? (
          <Close />
        ) : (
          <BsChevronLeft style={{ marginLeft: -4 }} />
        )}
      </button>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}

const CopyLinkSection = () => {
  const url = window.location.href;

  const fallbackCopyTextToClipboard = (text: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
      alert("Copied!");
    } catch (err) {
      alert("Unable to copy!");
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };
  const copyTextToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Async: Copying to clipboard was successful!");
        alert("Copied!");
      },
      (err) => {
        console.error("Async: Could not copy text: ", err);
        alert("Unable to copy!");
      }
    );
  };

  return (
    <div className={clsx("flex-align-center", styles["copy-link"])}>
      <div className={clsx("text-overflow-elipse", styles["link-text"])}>
        {url}
      </div>
      <div
        className={clsx("button", "grey-outlined", styles["copy-link-button"])}
        onClick={() => {
          copyTextToClipboard(url);
        }}
      >
        Copy link
      </div>
    </div>
  );
};

export default VideoDetailsModal;
