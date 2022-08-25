import { videoApi } from "_/api"

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