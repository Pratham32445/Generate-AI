import GoogleProvider from "next-auth/providers/google";
import prismaClient from "db";
import { NextAuthOptions, Profile } from "next-auth";

interface GoogleOptions extends Profile {
  picture: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile) return false;
      const { name, email, picture } = profile as GoogleOptions;
      const user = await prismaClient.user.findFirst({ where: { email } });
      if (!user) {
        await prismaClient.user.create({
          data: {
            email: email!,
            userName: name!,
            profilePicture: picture,
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
