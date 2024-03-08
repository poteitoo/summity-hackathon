import {
  GetVideoListResponseSchema,
  GetVideoResponseSchema,
} from "@/entities/video";
import { summity } from "@/lib/summity";

export const getVideoById = async (video_id: string) =>
  summity()
    .get(`/videos/${video_id}/`)
    .then((res) => GetVideoResponseSchema.parse(res.data));

export const getVideos = async () =>
  summity()
    .get(`/videos`)
    .then((res) => GetVideoListResponseSchema.parse(res.data));
