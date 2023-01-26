import api from "_/api"
import { 
    ResponseWithPagination, 
    Video, 
    Viewer, 
    ViewerPermission, 
    IVideoListType 
} from "_/types";
import { getToken } from "./account";

// ========================================================================
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
        getVideoById: builder.query<Video, string>({
            query: (id) => `/videos/${id}`,
        }),
        getVideoList: builder.query<ResponseWithPagination<Video>, {
            type: IVideoListType;
            page: number
        }>({
            query: ({type = "for-you", page = 1}) => ({
                url: `/videos`,
                params: {
                    type,
                    page
                },
                headers: getToken()? {
                    Authorization: `Bearer ${getToken()}`,
                } : {}
            })
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVideoByIdQuery, useGetVideoListQuery } = videoApi;


// ========================================================================
export const getVideo = async (id: number | string) => {
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

export const deleteVideo = async (videoId: number) => {
    const token = getToken();

    if (!token) return;

    const response = await api.delete(`videos/${videoId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const result = response.data;

    return result;
}