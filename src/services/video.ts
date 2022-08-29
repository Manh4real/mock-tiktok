import api, { videoApi } from "_/api"
import { getToken } from "./account";

export const getVideo = async () => {
    const result = await videoApi.get("popular", {
        params: {
            page: 1,
            per_page: 10
        },
        headers: {
            Authorization: process.env.REACT_APP_VIDEO_API_KEY as string
        }
    })

    const data = result.data.videos;

    return data;
}

export const getVideoList = async (type: "for-you" | "following" = "for-you", page: number = 1) => {
    const token = getToken();
    let headers = {};

    if (token !== null) {
        headers = {
            Authorization: `Bearer ${token}`
        }
    }

    const result = await api.get("/videos", {
        params: {
            type,
            page
        }, headers
    })
    const data = result.data;

    return data;
}

export const getVideosByUserId = async (id: number) => {
    const result = await api.get(`/users/${id}/posts`);
    const data = result.data;

    return data.data;
}