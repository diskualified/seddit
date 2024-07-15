"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { RegisterForm } from './registerForm'

const RegisterPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        <RegisterForm />
        <p className="text-center">
          Have an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Sign in
          </Link>{' '}
        </p>
      </div>
    </div>

    //   {/* <p>{loading && "loading..."}</p> */}
  );
};

export default RegisterPage;
