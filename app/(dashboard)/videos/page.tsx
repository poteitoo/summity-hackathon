"use client";

import { getVideos } from "@/repositories/video";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data: videos } = useSWR("videos/", () => getVideos());

  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      {videos && videos.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-1 gap-y-5 md:gap-3 lg:grid-cols-3">
          {videos.map(({ thumbnail, video_id, ...video }) =>
            thumbnail ? (
              <Link
                href={`/videos/${video_id}`}
                key={video.id}
                className="w-full max-w-96 bg-base-100"
              >
                <Image
                  loader={() => thumbnail}
                  src="next.svg"
                  alt={video.title || "thumbnail"}
                  width={300}
                  height={200}
                  className="w-full rounded-md"
                />
                <h2 className="font-medium">{video.title}</h2>
              </Link>
            ) : null,
          )}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin" />
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
