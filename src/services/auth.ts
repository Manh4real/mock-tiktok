import api from "_/api";
import { getToken } from "./account";

export const login = async (email: string, password: string) => {
    const response = await api.post(`/auth/login`, {
        email,
        password
    })
    const result = response.data;

    console.log(result);

    // 
    localStorage.setItem("tiktok_access_token", JSON.stringify(result.meta.token));

    return result;
}

export const signup = async (email: string, password: string) => {
    const response = await api.post(`/auth/register`, {
        type: "email",
        email,
        password
    })
    const result = response.data;

    console.log(result);
    localStorage.setItem("tiktok_access_token", JSON.stringify(result.meta.token));

    return result;
}

export const logout = async () => {
    const token = getToken();

    const response = await api.post(`/auth/logout`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    localStorage.setItem("tiktok_access_token", JSON.stringify(null));

    return response;
}