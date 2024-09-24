import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto'; // Use crypto to generate a unique token
import { sendVerificationEmail } from '@/utils/sendEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      console.error('Validation failed: Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.error('Email already registered:', email);
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = randomBytes(32).toString('hex'); // Generate unique token

    console.log('Creating user with email:', email);

    // Create a new user with the verification token
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
        id: true,
      },
    });

    if (!user || !user.email) {
      console.error('User creation failed:', user);
      return NextResponse.json({ error: 'User creation failed or email not found' }, { status: 500 });
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
