"use client";

import { Button } from "@/components/ui/button";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { getVideoById } from "@/repositories/video";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import useSWRImmutable from "swr/immutable";

export default function Page() {
  const [currentTime, setCurrentTime] = useState(0);
  const youtubeRef = useRef<YT.Player | null>(null);
  const { video_id } = useParams<{ video_id: string }>();
  const { data: video } = useSWRImmutable(["videos", video_id], () =>
    getVideoById(video_id),
  );
  const { isFullscreen, toggle: handleFullscreenChange } = useFullscreen();

  const handleYoutubeReady = (event: YT.PlayerEvent) => {
    youtubeRef.current = event.target;
  };
  const seekTo = (start?: string) => {
    const parsed = parseFloat(start || "");
    if (youtubeRef.current) {
      youtubeRef.current?.seekTo(parsed, true);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const curr = youtubeRef.current?.getCurrentTime();
      setCurrentTime(curr ?? 0);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  if (!video)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <div>Loading...</div>
      </div>
    );

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-3">
      <div className="fixed grid h-full w-full grid-cols-2 gap-3 p-3">
        <div className="h-full w-full">
          <YouTube
            videoId={video_id}
            className="h-full w-full"
            iframeClassName="h-full w-full"
            onReady={handleYoutubeReady}
          />
        </div>
        <div
          data-fullscreen={isFullscreen}
          className="row-span-2 h-[calc(100vh-64px)] w-full overflow-auto pb-32 data-[fullscreen=false]:h-[calc(100vh-100px)]"
        >
          <div className="flex flex-col gap-5">
            {video.segments?.map((segment) => (
              <div key={segment.id} className="">
                <Button
                  variant="link"
                  data-start={segment.start}
                  data-end={segment.end}
                  onClick={() => seekTo(segment.start)}
                  data-active={
                    parseFloat(segment.start) <= currentTime &&
                    parseFloat(segment.end) >= currentTime
                  }
                  className="data-[active=true]:font-bold data-[active=true]:text-green-600"
                >
                  {segment.speaker}
                </Button>
                <section className="flex gap-3">
                  <p
                    className="prose flex-1 data-[active=true]:font-bold data-[active=true]:text-green-600"
                    data-active={
                      parseFloat(segment.start) <= currentTime &&
                      parseFloat(segment.end) >= currentTime
                    }
                  >
                    {segment.text}
                  </p>
                </section>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full w-full">
          <Button className="btn" onClick={handleFullscreenChange}>
            {isFullscreen ? "exitFullscreen" : "fullscreen"}
          </Button>
        </div>
      </div>
    </div>
  );
}
