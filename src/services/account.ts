import api from "_/api";
import { Account } from "_/types";

export const getToken = () => {
    const a = localStorage.getItem("tiktok_access_token") || "null";

    return JSON.parse(a);
}

export const getCurrentUser = async () => {
    const token = getToken();

    if (!token) return;

    const response = await api.get(`auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const data = response.data;
    return data.data;
}

type Body = Partial<{
    first_name: string;
    last_name: string;
    nickname: string;
    avatar: File;
    bio: string;
}>
export const updateCurrentUser = async (body: Body) => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value, value.name);
        else formData.append(key, value);
    })

    const token = getToken();

    if (!token) return null;

    const response = await api.post(`auth/me`, formData, {
        params: {
            _method: "PATCH",
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const data = response.data;

    return data.data as Account;
}

export const getAccountByNickname = async (nickname: string) => {
    const token = getToken();
    let headers = {};

    if (token) {
        headers = {
            Authorization: `Bearer ${token}`
        }
    }

    const result = await api.get(`/users/@${nickname}`, { headers });
    const data = result.data;

    return data.data;
}

export const getSuggestedAccounts = async () => {
    const token = getToken();
    let headers = {};

    if (token) {
        headers = {
            Authorization: `Bearer ${token}`
        }
    }

    const result = await api.get(`users/suggested`, {
        params: {
            page: 1,
            per_page: 10
        },
        headers
    });
    const data = result.data;

    return data.data;
}

export const getFollowingAccounts = async (page: number = 1) => {
    const token = getToken();

    if (!token) return null;

    const result = await api.get(`/me/followings`, {
        params: {
            page
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = result.data;

    return data;
}

//
export const followAccount = async (id: number) => {
    const token = getToken();

    if (!token) return;

    const result = await api.post(`/users/${id}/follow`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return result.data;
}

export const unfollowAccount = async (id: number) => {
    const token = getToken();

    if (!token) return null;

    const result = await api.post(`/users/${id}/unfollow`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = result.data;

    return data.data;
}


// import { fakeApi } from "_/api";

// export const getAccount = async (id: number) => {
//     const result = await fakeApi.get(`accounts/${id}`);
//     const data = result.data;

//     return data;
// }
// export const getAccountByNickname = async (nickname: string) => {
//     const result = await fakeApi.get(`accounts?nickname=${nickname}`);
//     const data = result.data;

//     return data[0];
// }

// export const getSuggestedAccounts = async () => {
//     const result = await fakeApi.get('accounts', {
//         params: {
//             _limit: 10
//         }
//     });
//     const data = result.data;

//     return data;
// }

// export const getFollowingAccounts = async () => {
//     const result = await fakeApi.get(`accounts?id=12367860&id=12367861`);

//     const data = result.data;

//     return data;
// }