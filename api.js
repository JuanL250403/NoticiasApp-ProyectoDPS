import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  /*params: {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
  },*/
});

newsApi.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("apiToken");

    if (token) {
      const separator = config.url.includes("?") ? "&" : "?";
      config.url = `${config.url}${separator}apiKey=${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
