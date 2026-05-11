import axios from "axios";

export const newsApi = axios.create({
    baseURL: "https://newsapi.org/v2",
    params: {
        apiKey: process.env.EXPO_PUBLIC_API_KEY
    }
})