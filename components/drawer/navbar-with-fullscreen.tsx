"use client";

import { useFullscreen } from "@/hooks/use-fullscreen";
import { PropsWithChildren } from "react";

export const NavbarWithFullscreen = ({ children }: PropsWithChildren) => {
  const { isFullscreen } = useFullscreen();
  return (
    <div
      data-fullscreen={isFullscreen}
      className="navbar rounded-md border data-[fullscreen=true]:hidden"
    >
      {children}
    </div>
  );
};
