"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const SignInUserAvatar = () => {
  const { data: user } = useSession();

  return (
    <Avatar>
      <AvatarImage src={user?.user.image} />
      <AvatarFallback>{user?.user.name}</AvatarFallback>
    </Avatar>
  );
};
