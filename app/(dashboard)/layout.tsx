import { Drawer } from "@/components/drawer";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <Drawer>{children}</Drawer>;
}
