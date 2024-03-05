import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  console.error("medimo API endpoint is not defined");
}

export const summity = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  instance.interceptors.request.use((config) => {
    // URL 末尾のスラッシュを空文字列に置換
    config.url = config.url?.replace(/\/$/, "");
    return config;
  });
  return instance;
};
