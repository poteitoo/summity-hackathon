"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      <div className="fixed grid h-full w-full gap-3 p-3 md:grid-cols-2">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <YouTube
            videoId={video_id}
            className="h-full w-full"
            iframeClassName="h-full w-full"
            onReady={handleYoutubeReady}
          />
        </AspectRatio>
        <div
          data-fullscreen={isFullscreen}
          className="row-span-2 h-[calc(100vh-324px)] w-full overflow-auto pb-32 md:h-[calc(100vh-64px)] data-[fullscreen=false]:md:h-[calc(100vh-100px)]"
        >
          <div className="flex flex-col gap-5">
            {video.segments?.map((segment, i) => (
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
                  <p
                    className="prose flex-1 data-[active=true]:font-bold data-[active=true]:text-green-600"
                    data-active={
                      parseFloat(segment.start) <= currentTime &&
                      parseFloat(segment.end) >= currentTime
                    }
                  >
                    {video.translations?.[i]?.text}
                  </p>
                </section>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-full w-full justify-end gap-3">
          <Button
            className="hidden md:block"
            onClick={handleFullscreenChange}
            variant="secondary"
          >
            {isFullscreen ? "フルスクリーンを解除" : "フルスクリーンへ"}
          </Button>
          <Button
            className="hidden md:block"
            onClick={() => console.log("質問作成")}
            variant="secondary"
          >
            質問を作成
          </Button>
        </div>
      </div>
    </div>
  );
}
