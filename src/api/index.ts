import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const fakeApi = axios.create({
    baseURL: "http://localhost:3500"
})

export const videoApi = axios.create({
    baseURL: process.env.REACT_APP_VIDEO_API_URL
})

export default api;