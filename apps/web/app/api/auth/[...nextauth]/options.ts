import GoogleProvider from "next-auth/providers/google";
import prismaClient from "db";
import { NextAuthOptions } from "next-auth";
   
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ account, profile }) {
      if (!account || !profile) return false;
      const { name, email, image } = profile;
      const user = await prismaClient.user.findFirst({ where: { email } });
      if (!user) {
        await prismaClient.user.create({
          data: {
            email: email!,
            userName: name!,
            profilePicture: image,
          },
        });
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
};
