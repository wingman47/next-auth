// by default next pages are server component
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState("nothing");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUserId(res.data.data._id);
    setEmail(res.data.data.email);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const forgotPassword = async () => {
    try {
      await getUserDetails();
      await axios.post("/api/users/forgotpassword", { userId, email });
      console.log("reset link sent");
      setSent(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>
        {userId === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`profile/${userId}`}>{userId}</Link>
        )}
      </h2>
      <button onClick={logout} className="bg-blue-500 py-2 px-4 rounded">
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 py-2 px-4 rounded"
      >
        Get Details
      </button>
      <button
        className="bg-red-600-500 py-2 px-4 rounded"
        onClick={forgotPassword}
      >
        Forgot Password
      </button>
      {sent ? <h1>Reset Link Sent Successfully</h1> : <></>}
    </div>
  );
}
