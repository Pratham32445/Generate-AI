import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import prismaClient from "db";
import { Plus } from "lucide-react";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;
  const User = await prismaClient.user.findFirst({
    where: {
      email: session.user.email!,
    },
  });
  return (
    <div className="max-w-4xl m-auto mt-[30px] opacity-0 animate-fade-up  [animation-delay:400ms]">
      <div>
        <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
          <Image
            src={"/first.jpeg?height=200&width=200"}
            fill
            objectFit="cover"
            alt="User"
          />
        </div>
        <div>
          <div className="bg-[#DEFF00] cursor-pointer w-fit p-3 rounded-full">
            <Plus color="#000000" />
          </div>
        </div>
        <div className="my-5">
          <div>
            <p className="text-md font-montserrat">Email:</p>
            <p className="text-lg font-montserrat">{User?.email}</p>
          </div>
          <div className="my-5">
            <p className="text-md font-montserrat">Name:</p>
            <p className="text-lg font-montserrat">{User?.userName}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
