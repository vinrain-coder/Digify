// app/api/verify-email/route.ts
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    // Find the user by the verification token
    const user = await prisma.user.findUnique({
      where: { verificationToken: token }, // Ensure this field exists in your User model
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null, // Clear the token after verification
      },
    });

    console.log(`Email verified successfully for user ID: ${user.id}`); // Log successful verification

    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Something went wrong during email verification.' }, { status: 500 });
  }
}


