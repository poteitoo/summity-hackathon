import { z } from "zod";

export const VideoOrignalSchema = z.object({
  id: z.string(),
  video_id: z.string(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  thumbnail: z.string().nullish(),
  tags: z
    .string()
    .nullish()
    .transform((tag) => (tag ? tag.split(",") : [])),
  category: z.string().nullish(),
  language: z.string().nullish(),
  extension: z.string().nullish(),
  duration: z.number().nullish(),
  num_speakers: z.number().nullish(),
  is_embedable: z.boolean().nullish(),
  is_public: z.boolean().nullish(),
  download_status: z.string().nullish(),
  transcribing_status: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user_id: z.string().nullish(),
});

export const GetVideoResponseSchema = VideoOrignalSchema;
export type GetVideoResponseSchemaType = z.infer<typeof GetVideoResponseSchema>;

export const GetVideoListResponseSchema = z.array(VideoOrignalSchema);
export type GetVideoListResponseSchemaType = z.infer<
  typeof GetVideoListResponseSchema
>;
