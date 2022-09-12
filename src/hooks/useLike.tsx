import { useCallback, useEffect, useState } from "react";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { updateVideo } from "_/features/videos/videosSlice";

// services
import { dislikePost, likePost } from "_/services/post";

import { Video } from "_/types";
interface Props {
  postId: number;
  isLiked: boolean;
  likesCount: number;
}

const useLike = ({ postId, isLiked, likesCount }: Props) => {
  const [value, setValue] = useState<number>(likesCount);
  const [active, setActive] = useState<boolean>(isLiked);

  const dispatch = useAppDispatch();

  const toggle = useCallback(() => {
    if (!active) {
      likePost(postId)
        .then((video: Video) => {
          setValue(video.likes_count);
          setActive(video.is_liked);

          dispatch(
            updateVideo({
              id: postId,
              changes: {
                likes_count: video.likes_count,
                is_liked: video.is_liked,
              },
            })
          );
        })
        .catch(() => {
          alert("Can't like the video.");
        });
    } else {
      dislikePost(postId)
        .then((video: Video) => {
          setValue(video.likes_count);
          setActive(video.is_liked);

          dispatch(
            updateVideo({
              id: postId,
              changes: {
                likes_count: video.likes_count,
                is_liked: video.is_liked,
              },
            })
          );
        })
        .catch(() => {
          alert("Can't unlike the video.");
        });
    }
  }, [active, dispatch, postId]);

  //
  useEffect(() => {
    setValue(likesCount);
    setActive(isLiked);
  }, [likesCount, isLiked]);

  return {
    value,
    active,
    toggle,
  };
};

export default useLike;
