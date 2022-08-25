import { fakeApi } from "_/api";

export const getPosts = async (page: number = 1) => {
    const result = await fakeApi.get("posts", {
        params: {
            _page: page,
            _limit: 2
        }
    });
    const data = result.data;

    return data;
}

export const likePost = async (postId: number, value: number) => {
    const result = await fakeApi.patch(`posts/${postId}`, {
        likes_count: value
    })
    const data = result.data;

    return data.likes_count;
}

export const dislikePost = async (postId: number, value: number) => {
    const result = await fakeApi.patch(`posts/${postId}`, {
        likes_count: value
    })
    const data = result.data;

    return data.likes_count;
}