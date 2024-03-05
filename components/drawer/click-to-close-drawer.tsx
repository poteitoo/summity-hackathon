"use client";

import { PropsWithChildren } from "react";

export const ClickToCloseDrawerLi = ({ children }: PropsWithChildren) => {
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "left-drawer",
    ) as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return <li onClick={closeDrawer}>{children}</li>;
};
