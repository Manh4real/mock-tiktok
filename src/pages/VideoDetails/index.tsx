import React, { useEffect, useState } from "react";
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

// icons
import { BsChevronLeft } from "react-icons/bs";
import { Close, MusicNote } from "_/components/icons";

// styles
import styles from "./VideoDetails.module.scss";

// services
import { getVideo } from "_/services/video";

// config
import routes from "_/config/routes";

// context
import { useLoginContext } from "_/contexts";

// types
import { Video as VideoInterface } from "_/types";

function VideoDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { background: Location } | null;
  const locationBackground = locationState?.background;

  const params = useParams();
  const videoId = params.videoId;

  const { currentUser } = useLoginContext();
  const [video, setVideo] = useState<VideoInterface>();

  useEffect(() => {
    if (!videoId) return;

    getVideo(+videoId).then((data) => {
      setVideo(data);
    });
  }, [videoId]);

  if (!video) return null;

  const author = video.user;
  const authorName =
    author.full_name || `${author.first_name} ${author.last_name}`;

  return ReactDOM.createPortal(
    <div className={styles["container"]}>
      <div className={styles["left"]}>
        <div className={styles["video-container"]}>
          <Video
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
          {currentUser?.info.data.id !== video.user_id && (
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
        </div>

        <CommentSection videoId={video.id} video_uuid={video.uuid} />
      </div>
      <button
        className={styles["closeBtn"]}
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

export default VideoDetails;
