import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";

// styles
import styles from "./VideoDetailsPage.module.scss";

// components
import AccountPopup from "_/components/AccountPopup";
import TimeAgo from "_/components/TimeAgo";
import Image from "_/components/Image";

import FollowButton from "_/components/Post/FollowButton";
import LikeButton from "_/components/Post/LikeButton";
import { CommentButtonWithContext } from "./VideoDetailsModal";

import Video from "./components/DetailsPageVideo";
import PageCommentSection from "./components/PageCommentSection";

// icons
import { BsChevronLeft } from "react-icons/bs";
import { MusicNote, Spinner } from "_/components/icons";

// pages
import { UnavailableVideoPage } from "_/pages";

// services
import { getVideo } from "_/services/video";

// config
import routes from "_/config/routes";

// types
import { Video as VideoInterface } from "_/types";

// context
import { CommentCommandProvider } from "_/contexts";

// Redux
import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import { addAccount } from "_/features/accounts/accountsSlice";
import { toTag } from "_/utils";

type ProgressState = "start" | "loading" | "fulfilled";

function VideoDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const videoId = params.videoId;

  // Redux
  const currentUserInfo = useCurrentUserInfo();
  const dispatch = useAppDispatch();

  const [video, setVideo] = useState<VideoInterface>();
  const [state, setState] = useState<ProgressState>("start");

  useEffect(() => {
    if (!videoId) return;

    setState("loading");
    getVideo(videoId)
      .then((data: VideoInterface) => {
        setVideo(data);

        dispatch(addAccount(data.user));
      })
      .catch(() => {
        console.log("Can't get the video");
        document.title = "This video is unavailable.";
      })
      .finally(() => {
        setState("fulfilled");
      });
  }, [dispatch, videoId]);

  if (state === "loading")
    return (
      <Spinner
        style={{
          marginTop: 30,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      />
    );
  if (!video && state === "fulfilled") {
    return <UnavailableVideoPage />;
  }
  if (!video) {
    return null;
  }

  const author = video.user;
  const authorName =
    author.full_name || `${author.first_name} ${author.last_name}`;
  const isAllowedToComment = video.allows.some((a) => a === "comment");

  return (
    <div className={styles["container"]}>
      <header>
        <div
          className={clsx(
            "button",
            "flex-align-center",
            styles["goBack-button"]
          )}
          onClick={() => {
            navigate(routes.root);

            document.body.style.overflow = "overlay";
          }}
        >
          <BsChevronLeft fill="currentColor" size={24} />
          <span>Back to For You</span>
        </div>
      </header>
      <div className={styles["main"]}>
        <div className={clsx(styles["left"])}>
          <div className={styles["left__upper"]}>
            <div className={styles["video-container"]}>
              <div style={{ height: "100%", zIndex: 3, position: "relative" }}>
                <Video
                  autoPlay
                  authorId={video.user_id}
                  postId={video.id}
                  src={video.file_url}
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
          </div>
          <CommentCommandProvider
            key={video.uuid}
            initialCommentsCount={video.comments_count}
            videoId={video.id}
            video_uuid={video.uuid}
          >
            <div className={styles["left__lower"]}>
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
              </div>
              <div className={styles["author"]}>
                <AccountPopup account={author}>
                  <Link
                    to={"/@" + author.nickname}
                    className={clsx(styles["author-link"], "flex-align-center")}
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
                        <span className={styles["author-name"]}>
                          {authorName}
                        </span>
                        <span style={{ marginInline: 5 }}>&middot;</span>
                        <TimeAgo time={video.created_at} />
                      </div>
                    </div>
                  </Link>
                </AccountPopup>
                {currentUserInfo?.id !== video.user_id && (
                  <div className={styles["follow-button"]}>
                    <FollowButton styles={styles} accountId={author.id} />
                  </div>
                )}
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
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                {isAllowedToComment && (
                  <div style={{ marginTop: 21, marginRight: -12 }}>
                    <Image
                      src={currentUserInfo?.avatar}
                      className={clsx("circle")}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <PageCommentSection
                    authorId={video.user_id}
                    videoId={video.id}
                    video_uuid={video.uuid}
                    isAllowed={isAllowedToComment}
                  />
                </div>
              </div>
            </div>
          </CommentCommandProvider>
        </div>
        <div className={styles["right"]}></div>
      </div>
    </div>
  );
}

export default VideoDetailsPage;
