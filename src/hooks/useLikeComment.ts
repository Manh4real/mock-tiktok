import { useState } from "react";
import { useAppDispatch } from '_/features/hooks';
import { show } from "_/features/alert/alertSlice";

import { likeComment, unlikeComment } from "_/services/comment";

const useLikeComment = (initialState: boolean, commentId: number, likes_count: number) => {
    const dispatch = useAppDispatch();

    const [liked, setLiked] = useState<boolean>(initialState);
    const [likesCount, setLikesCount] = useState<number>(likes_count);

    const toggle = () => {
        if (!liked) {
            likeComment(commentId)
                .then((result) => {
                    if (!result) return;

                    setLiked(result.is_liked);
                    setLikesCount(result.likes_count)
                })
                .catch(() => {
                    // alert("Like Comment Error: Something went wrong.");
                    dispatch(show({ message: "Like Comment Error: Something went wrong." }))
                });
        } else {
            unlikeComment(commentId)
                .then((result) => {
                    if (!result) return;

                    setLiked(result.is_liked);
                    setLikesCount(result.likes_count)
                })
                .catch(() => {
                    // alert("Unlike Comment Error: Something went wrong.");
                    dispatch(show({ message: "Unlike Comment Error: Something went wrong." }))
                });
        }
    };

    return [liked, toggle, likesCount] as [boolean, () => void, number];
}

export default useLikeComment;