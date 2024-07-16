"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
    //   console.log("Res: ", res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {}
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="email">Email</label>
        <input
          className="mt-2 p-2 block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="password">Password</label>
        <input
          className="mt-2 p-2 block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="•••••••••"
        />
      </div>
      {error && <div className="text-red-500 sm:text-sm">{error}</div>}
      <button className="btn w-full">Login</button>
    </form>
  );
};
