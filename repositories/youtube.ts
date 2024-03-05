import {
  GetYTVideoInfoFromDBSchema,
  PostYTVideoDownload,
} from "@/entities/youtube";
import { summity } from "@/lib/summity";

export const getYTVideoInfo = async (video_id: string) =>
  summity()
    .get(`/youtube/info/${video_id}`)
    .then((res) => {
      return res.data;
    });

export const getYTVideoInfoFromDB = async (video_id: string) =>
  summity()
    .get(`/youtube/${video_id}`)
    .then((res) => {
      return GetYTVideoInfoFromDBSchema.parse(res.data);
    });

export const postYTVideoDownload = async (video_id: string) =>
  summity()
    .post(`/youtube/${video_id}`, {})
    .then((res) => {
      return PostYTVideoDownload.parse(res.data);
    });
