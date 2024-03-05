"use server";

import { postYTVideoDownload } from "@/repositories/youtube";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url({
    message: "有効なURLではありません。",
  }),
});

export const requesthVideoTranscription = async (url: string) => {
  const parse = formSchema.safeParse({
    url,
  });
  if (!parse.success) {
    return { message: "有効なURLではありません", video_id: null, error: true };
  }
  const params = new URLSearchParams(url.split("?")[1]);
  const video_id = params.get("v");

  if (!video_id) {
    return { message: "有効なURLではありません", video_id: null, error: true };
  }
  try {
    const request = await postYTVideoDownload(video_id);
    console.log(request);
    return { message: `リクエストを受け付けました`, video_id, error: false };
  } catch (error: unknown) {
    return { message: `リクエストに失敗しました`, video_id, error: true };
  }
};
