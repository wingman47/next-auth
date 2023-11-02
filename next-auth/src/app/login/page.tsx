// declaring it as frontend component so that we can utilise client side functionalities like hooks etc.
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userAgent } from "next/server";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [userAgent]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      // finally block is executed after the try-catch blocks
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr className="w-1/3 mb-4 border-t border-gray-500" />
      <div className="flex flex-col gap-3 items-center">
        <label className="text-lg" htmlFor="email">
          Email:
        </label>
        <input
          className="rounded-md border-2 border-gray-400 p-2 text-black"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Email"
        />
      </div>
      <hr className="w-1/3 my-4 border-t border-gray-500" />
      <div className="flex flex-col gap-3 items-center text-black">
        <label className="text-lg" htmlFor="password">
          Password:
        </label>
        <input
          className="rounded-md border-2 border-gray-400 p-2"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Password"
        />
      </div>
      <hr className="w-1/3 my-4 border-t border-gray-500" />
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        onClick={onLogin}
      >
        {buttonDisabled ? "Fill Data" : "Login"}
      </button>
      <Link href="/signup" className="mt-2 text-blue-500">
        Not a User? Sign Up
      </Link>
    </div>
  );
}
