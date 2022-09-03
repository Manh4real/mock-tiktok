import api from "_/api"
import { ResponseWithPagination, Video, Viewer, ViewerPermission } from "_/types";
import { getToken } from "./account";

// export const getVideos = async () => {
//     const result = await videoApi.get("popular", {
//         params: {
//             page: 1,
//             per_page: 10
//         },
//         headers: {
//             Authorization: process.env.REACT_APP_VIDEO_API_KEY as string
//         }
//     })

//     const data = result.data.videos;

//     return data;
// }

export const getVideo = async (id: number) => {
    const token = getToken();
    let headers = {};

    if (token) {
        headers = {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await api.get(`/videos/${id}`, { headers });

    const result = response.data;

    return result.data;
}


export const getVideoList = async (type: "for-you" | "following" = "for-you", page: number = 1) => {
    const token = getToken();
    let headers = {};

    if (token !== null) {
        headers = {
            Authorization: `Bearer ${token}`,
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

export const getLikedVideos = async (id: number) => {
    const token = getToken();

    const result = await api.get(`/users/${id}/liked-videos`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = result.data as ResponseWithPagination<Video>;

    return data;
}

//===============
type Body = Partial<{
    description: string;
    upload_file: File;
    thumbnail_time: number;
    musics?: string;
    viewable: Viewer;
    "allows[]": ViewerPermission;
}>
export const uploadVideo = async (body: Body) => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value, value.name);
        else if (key === "allows[]") {
            const allows = value as ViewerPermission;

            allows.forEach(allow => {
                formData.append(key, allow)
            })
        }
        else formData.append(key, value as string);
    })

    const token = getToken();

    if (!token) return;

    const response = await api.post(`/videos`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const data = response.data;

    return data.data;
}