import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async (req : NextRequest) => {
  const session = await getServerSession(authOptions);
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get('email');
  const userEmail = (session?.user?.email || email)!;
  const token = jwt.sign(
    { email: userEmail },
    process.env.NEXTAUTH_SECRET!
  );
  return NextResponse.json({ token });
};
