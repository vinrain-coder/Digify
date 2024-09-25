import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/libs/emailService'; // Ensure it's imported correctly

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = randomBytes(32).toString('hex'); // Generate unique token

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        verificationToken,
        isVerified: false, // Set to unverified initially
      },
      select: {
        email: true,
        id: true, // Ensure email and id are selected
      },
    });

    console.log('Created user:', user); // Log the user object to debug

    // Ensure email exists before sending verification
    if (!user.email) {
      console.error('User email not found:', user);
      return NextResponse.json({ error: 'Failed to find email for verification' }, { status: 500 });
    }

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);
    console.log('Verification email sent to:', user.email);

    return NextResponse.json({ message: 'Registration successful! Please check your email to verify your account.' });
  } catch (error: any) {
    console.error('Registration error:', error.message || error);
    return NextResponse.json({ error: error.message || 'Something went wrong during registration' }, { status: 500 });
  }
}
