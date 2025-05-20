"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter as userRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slice/auth.slice";
import ProfileCard from "@/components/core/profileCard";
import { Button } from "@/components/ui/button";

export default function Dashboardpage() {
  const router = userRouter();
  const token = useSelector((state: RootState) => state.global.authLogin.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [token, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-row min-h-screen  p-1 bg-gray-50 overflow-x-hidden">
      <section className="flex-1 flex justify-center bg-blue-950 ">
        <div className="p-2 border border-amber-950 w-full max-w-md">
          <div className="bg-white w-full flex flex-col items-center">
            <ProfileCard />
          </div>
          <Button className="w-full h-10 mt-3 mb-3">Tambahkan Link</Button>
        </div>
      </section>
      {/* <section className=" hidden flex-1 flex-col items-center mt-4 ">
            <div className='w-1/2 bg-amber-200'>
            <h2 className="text-xl font-bold">Your Profile</h2>
            <p className="text-lg">Username: {token}</p>
            <p className="text-lg">Email: {token}</p>
            </div>
        </section> */}
    </main>
  );
}
