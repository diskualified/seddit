'use client'  

import { signIn, signOut } from "next-auth/react";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center m-0 p-0">
      <p>Welcome to Seddit</p>

      <button className="btn" onClick={() => signOut()}>Logout</button>
    </div>    
  );
}
