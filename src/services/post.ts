import api from "_/api";
import { getToken } from "./account";

export const likePost = async (postId: number) => {
    const token = getToken();

    if (!token) return;

    const result = await api.post(`videos/${postId}/like`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })
    const data = result.data;

    return data.data;
}

export const dislikePost = async (postId: number) => {
    const token = getToken();

    if (!token) return;

    const result = await api.post(`videos/${postId}/unlike`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })
    const data = result.data;

    return data.data;
}