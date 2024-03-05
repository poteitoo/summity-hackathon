"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";

export const ActiveLinkByLocation = ({
  href,
  children,
  className,
}: PropsWithChildren<{
  href: string;
  className?: ClassNameValue;
}>) => {
  const pathname = usePathname();
  const switchVariantsByPathname = (href: string) => pathname.includes(href);

  return (
    <Link
      href={href}
      data-variant={switchVariantsByPathname(href)}
      className={twMerge("data-[variant=true]:bg-gray-300", className)}
    >
      {children}
    </Link>
  );
};
