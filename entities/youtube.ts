import { z } from "zod";

export const GetYTVideoInfoFromDBSchema = z.object({
  video_id: z.string(),
  title: z.string(),
  duration: z.number(),
  thumbnail: z.string(),
  description: z.string(),
  is_embedable: z.boolean(),
  tags: z.array(z.string()),
  language: z.string(),
  category: z.string(),
  is_public: z.boolean(),
  download_status: z.string(),
});

export const PostYTVideoDownload = z.object({
  status: z.string(),
});
