import api from "_/api";

// const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTY2MTYxODMxOCwiZXhwIjoxNjY0MjEwMzE4LCJuYmYiOjE2NjE2MTgzMTgsImp0aSI6ImZGdzkwNDFxRzFDNEJTRkwiLCJzdWIiOjE1NSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.YOQRH6mP20WyzLE5CksGRSRzlC6JFAK2YRv8g0l07rI"

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

export const getAccount = async (id: number) => {

}

export const getAccountByNickname = async (nickname: string, token: string | null) => {
    const _token = getToken();
    let headers = {};

    if (_token !== null) {
        headers = {
            Authorization: `Bearer ${_token}`
        }
    }

    const result = await api.get(`/users/@${nickname}`, { headers });
    const data = result.data;

    return data.data;
}

export const getSuggestedAccounts = async () => {
    const token = getToken();
    let headers = {};

    if (token !== null) {
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

export const getFollowingAccounts = async () => {
    const token = getToken();

    const result = await api.get(`/me/followings`, {
        params: {
            page: 1
        },
        headers: {
            // Authorization: `Bearer ${ACCESS_TOKEN}`
            Authorization: `Bearer ${token}`
        }
    });
    const data = result.data;

    return data.data;
}

//
export const followAccount = async (id: number) => {
    const token = getToken();

    const result = await api.post(`/users/${id}/follow`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return result.data;
}

export const unfollowAccount = async (id: number) => {
    const token = getToken();

    const result = await api.post(`/users/${id}/unfollow`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return result.data;
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