import { PropsWithChildren } from "react";
import { ActiveLinkByLocation } from "./active-link-by-location";
import { ClickToCloseDrawerLi } from "./click-to-close-drawer";
import { NavbarWithFullscreen } from "./navbar-with-fullscreen";

export const Drawer = ({ children }: PropsWithChildren) => {
  return (
    <div className="drawer h-screen">
      <input id="left-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center p-3">
        <NavbarWithFullscreen>
          <div className="flex-none md:hidden">
            <label
              htmlFor="left-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">summity.io</div>
          <div className="hidden flex-none md:block">
            <ul className="menu menu-horizontal gap-5">
              <li>
                <ActiveLinkByLocation href="/home">ホーム</ActiveLinkByLocation>
              </li>
              <li>
                <ActiveLinkByLocation href="/videos">
                  動画一覧
                </ActiveLinkByLocation>
              </li>
            </ul>
          </div>
        </NavbarWithFullscreen>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="left-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-4/5 max-w-64 rounded-md bg-slate-200 p-4">
          <ClickToCloseDrawerLi>
            <ActiveLinkByLocation href="/home">ホーム</ActiveLinkByLocation>
          </ClickToCloseDrawerLi>
          <ClickToCloseDrawerLi>
            <ActiveLinkByLocation href="/videos">動画一覧</ActiveLinkByLocation>
          </ClickToCloseDrawerLi>
        </ul>
      </div>
    </div>
  );
};
