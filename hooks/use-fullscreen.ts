import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const documentRef = useRef<Document | null>(null);
  useEffect(() => {
    documentRef.current = document;
  }, []);
  useEventListener(
    "fullscreenchange",
    () => {
      const isFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isFullscreen);
    },
    documentRef,
  );
  const toggle = () => {
    if (isFullscreen) {
      documentRef.current?.exitFullscreen();
    } else {
      documentRef.current?.documentElement.requestFullscreen();
    }
  };

  return {
    isFullscreen,
    toggle,
  };
};
