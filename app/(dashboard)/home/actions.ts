"use server";

import { authOptions } from "@/lib/nextauth";
import { getUserOrPostUserIfNotExist } from "@/repositories/user";
import { postYTVideoDownload } from "@/repositories/youtube";
import { getServerSession } from "next-auth";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url({
    message: "有効なURLではありません。",
  }),
});

export const requesthVideoTranscription = async (url: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "ログインしてください", video_id: null, error: true };
  }
  let userId = "";
  try {
    const user = await getUserOrPostUserIfNotExist(session.user);
    if (!user.id) throw new Error("User not found");
    userId = user.id;
  } catch (error: unknown) {
    return {
      message: "ユーザー情報の取得に失敗しました。",
      video_id: null,
      error: true,
    };
  }

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
    await postYTVideoDownload(video_id, userId);
    return { message: `リクエストを受け付けました`, video_id, error: false };
  } catch (error: unknown) {
    return { message: `リクエストに失敗しました`, video_id, error: true };
  }
};
