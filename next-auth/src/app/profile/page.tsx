// by default next pages are server component
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
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
  return (
    <div>
      <h1>Profile</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button onClick={logout} className="bg-blue-500 py-2 px-4 rounded">
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 py-2 px-4 rounded"
      >
        GET DETAILS
      </button>
    </div>
  );
}
