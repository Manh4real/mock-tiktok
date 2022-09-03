import api from "_/api";
import { Comment, ResponseWithPagination } from "_/types";
import { getToken } from "./account";

export const createNewComment = async (video_uuid: string, comment: string) => {

    const token = getToken();

    const response = await api.post(`videos/${video_uuid}/comments`, {
        comment
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = response.data;

    return result.data as Comment;
}

export const getComments = async (video_uuid: string) => {
    const token = getToken();

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const response = await api.get(`videos/${video_uuid}/comments`, {
        headers
    });

    const result = response.data as ResponseWithPagination<Comment>;

    return result;
}

export const likeComment = async (comment_id: number) => {
    const token = getToken();

    if (!token) return;

    const response = await api.post(`comments/${comment_id}/like`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = response.data;
    return result.data as Comment;
}
export const unlikeComment = async (comment_id: number) => {
    const token = getToken();

    if (!token) return;

    const response = await api.post(`comments/${comment_id}/unlike`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = response.data;
    return result.data as Comment;
}

export const deleteComment = async (comment_id: number) => {
    const token = getToken();

    if (!token) return;

    const response = await api.delete(`comments/${comment_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const result = response.data;

    return result;
}