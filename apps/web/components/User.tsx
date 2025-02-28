"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import Link from "next/link";
import { getSession } from "next-auth/react";

interface User {
  profilePicture: string;
  credits: string;
  userName: string;
}

const User = () => {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      if (!session || !session.user) return;
      const tokenData = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/token?email=${session.user.email}`
      );
      const userData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      if (userData) {
        setUser(userData.data.user);
      }
    };
    getUser();
  }, []);
  console.log(user?.userName);
  if (!user) return;
  return (
    user && (
      <div className="flex items-center gap-4 px-4">
        <Link href={"/user/profile"}>
          <Avatar>
            <AvatarImage src={user.profilePicture} alt="@shadcn" />
            <AvatarFallback>
              {user.userName.split("")[0][0]}
              {user.userName.split("")[0][1]}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <p>Credit : ${user.credits && Number(user.credits).toFixed(2)}</p>
        </div>
      </div>
    )
  );
};

export default User;
