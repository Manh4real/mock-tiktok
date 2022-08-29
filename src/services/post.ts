import api from "_/api";

export const likePost = async (postId: number) => {
    const result = await api.post(`posts/${postId}/like`)
    const data = result.data;

    return data.likes_count;
}

export const dislikePost = async (postId: number) => {
    const result = await api.post(`posts/${postId}/like`)
    const data = result.data;

    return data.likes_count;
}

// import { fakeApi } from "_/api";

// export const getPosts = async (page: number = 1) => {
//     const result = await fakeApi.get("posts", {
//         params: {
//             _page: page,
//             _limit: 2
//         }
//     });
//     const data = result.data;

//     return data;
// }
// export const getPostsByAccountId = async (accountId: number) => {
//     const result = await fakeApi.get("posts", {
//         params: {
//             author_id: accountId
//         }
//     });
//     const data = result.data;

//     return data;
// }

// export const likePost = async (postId: number, value: number) => {
//     const result = await fakeApi.patch(`posts/${postId}`, {
//         likes_count: value
//     })
//     const data = result.data;

//     return data.likes_count;
// }

// export const dislikePost = async (postId: number, value: number) => {
//     const result = await fakeApi.patch(`posts/${postId}`, {
//         likes_count: value
//     })
//     const data = result.data;

//     return data.likes_count;
// }