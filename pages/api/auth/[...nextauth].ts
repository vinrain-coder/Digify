import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb"; // Ensure this points to your Prisma client
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Validate the credentials input
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        // 2. Fetch the user from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 3. Check if the user exists and has a password set
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        // 4. Verify if the provided password matches the hashed password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // 5. Return an error if the password is incorrect
        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        // 6. Return the authenticated user if credentials are valid
        return user;
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


