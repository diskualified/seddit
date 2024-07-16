import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { LoginForm } from "./loginForm";

const LoginPage = () => {
  //   const session = useSession();

  //   useEffect(() => {
  //     if (session.status === "authenticated") {
  //       router.push("/");
  //     }
  //   }, [session.status, router]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        <LoginForm />
        <p className="text-center">
          Need to create an account?{" "}
          <Link className="text-indigo-500 hover:underline" href="/register">
            Create Account
          </Link>{" "}
        </p>
      </div>
      {/* <p>{loading && "logging in..."}</p> */}
    </div>
  );
};

export default LoginPage;
