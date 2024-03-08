"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export const ToggleSignInAndSignUp = () => {
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <Button onClick={() => signIn("github")}>サインイン</Button>
      ) : (
        <Button onClick={() => signOut()}>サインアウト</Button>
      )}
    </>
  );
};
