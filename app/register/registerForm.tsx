"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
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
        <label htmlFor="username">Username</label>
        <input
          className="mt-2 p-2 block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="username"
          placeholder="Username"
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
      <button className="w-full btn">Register</button>
    </form>
  );
};
