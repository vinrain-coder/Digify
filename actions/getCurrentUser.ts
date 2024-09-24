import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  try {
    // Retrieve session using NextAuth's getServerSession
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    // If no session or session has no user email, return null
    if (!session?.user?.email) {
      return null; // Ensure we return null if there's no email
    }

    // Fetch user from the database by email
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // If user is not found, return null
    if (!currentUser) {
      return null; // Return null if no user found
    }

    // Return user data, ensuring date fields are converted to ISO strings
    return {
      ...currentUser,
      createdAt: currentUser.createdAt?.toISOString(),
      updatedAt: currentUser.updatedAt?.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // Return null in case of error
  }
}
