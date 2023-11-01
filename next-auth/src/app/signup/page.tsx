// declaring it as frontend component so that we can utilise client side functionalities like hooks etc.
// ! all the logs in this file would be available on the client side console because we have declared use client on this page
// ! we can also declare "use server" to specific blocks in this page as well to declare them as server components
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [user]);


  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
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
        {loading ? "Processing" : "Sign Up"}
      </h1>
      <div className="flex flex-col gap-3 items-center">
        <label className="text-lg" htmlFor="username">
          Username:
        </label>
        <input
          className="rounded-md border-2 text-black border-gray-400 p-2"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter Username"
        />
      </div>
      <hr className="w-1/3 my-4 border-t border-gray-500" />
      <div className="flex flex-col gap-3 items-center">
        <label className="text-lg" htmlFor="email">
          Email:
        </label>
        <input
          className="rounded-md border-2 text-black border-gray-400 p-2"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Email"
        />
      </div>
      <hr className="w-1/3 my-4 border-t border-gray-500" />
      <div className="flex flex-col gap-3 items-center">
        <label className="text-lg" htmlFor="password">
          Password:
        </label>
        <input
          className="rounded-md border-2 text-black border-gray-400 p-2"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Password"
        />
      </div>
      <hr className="w-1/3 my-4 border-t border-gray-500" />
      <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600" onClick={onSignUp}>
        {buttonDisabled ? "Fill Data" : "Sign Up"}
      </button>
      <Link href="/login" className="mt-2 text-blue-500">
        Already a User? Login
      </Link>
    </div>
  );
}
