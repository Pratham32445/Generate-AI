import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

const User = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;
  const tokenData = await axios.get(
    `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/token`
  );
  const userData = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.data.token}`,
      },
    }
  );
  console.log(userData.data);
  if (!userData) return;
  return (
    <div className="flex items-center gap-4 px-4">
      <Link href={"/user/profile"}>
        <Avatar>
          <AvatarImage src={session.user.image!} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div>
        <p>Credit : ${userData.data.user.credits}</p>
      </div>
    </div>
  );
};

export default User;
