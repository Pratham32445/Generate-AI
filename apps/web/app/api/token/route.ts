import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const token = jwt.sign(
    { email: session?.user?.email },
    process.env.NEXTAUTH_SECRET!
  );
  return NextResponse.json({ token });
};
