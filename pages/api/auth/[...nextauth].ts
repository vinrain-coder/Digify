import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb"; // Ensure this points to your Prisma client
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // If the user does not exist, create one
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              // You can add other necessary fields here, like hashedPassword if required
            },
          });
          return newUser; // Return the newly created user
        }

        return existingUser; // Return the existing user
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user; // Return the authenticated user
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for encrypting session
};

export default NextAuth(authOptions);

