import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

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

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        verificationToken: randomBytes(32).toString('hex'), // Generate unique token
        isVerified: false, // Set to unverified initially
      },
      select: {
        email: true,
        id: true, // Ensure email and id are selected
      },
    });

    console.log('Created user:', user); // Log the user object to debug

    return NextResponse.json({ message: 'Registration successful!' });
  } catch (error: any) {
    console.error('Registration error:', error.message || error);
    return NextResponse.json({ error: error.message || 'Something went wrong during registration' }, { status: 500 });
  }
}
