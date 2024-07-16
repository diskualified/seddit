"use client";

import { signIn, signOut, useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
export default function Home() {
  // const session = getServerSession();
  // if (!session) {
  //   redirect("/login");
  // }
  const { data: session } = useSession();
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center m-0 p-0">
      <p>Welcome to Seddit</p>
      <div>
        <p>Email: {session?.user?.email}</p>
      </div>
      <button className="btn" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
