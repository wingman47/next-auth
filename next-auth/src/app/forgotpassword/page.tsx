"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const forgotPassword = async () => {
    try {
      await axios.post("/api/users/verifypassword", { token, password });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Enter new password</h1>
      <input
        type="password"
        placeholder="new password"
        className="text-black"
        onChange={(e: any) => {
          setPassword(e.target.value);
        }}
      />

      <button onClick={forgotPassword} className="p-2 bg-orange-500 text-black">
        Verify
      </button>
      {verified && (
        <div>
          <h2 className="text-2xl">Password Reset Successful</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
