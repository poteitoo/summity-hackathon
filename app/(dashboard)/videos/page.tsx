"use client";

import { getVideos } from "@/repositories/video";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data: videos } = useSWR("videos/", () => getVideos());

  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <div className="mt-5 grid grid-cols-2 gap-1 gap-y-5 md:gap-3 lg:grid-cols-3">
        {videos?.map(({ thumbnail, video_id, ...video }) =>
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
    </div>
  );
}
