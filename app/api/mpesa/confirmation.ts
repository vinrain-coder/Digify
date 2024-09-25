import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Process the response, log or save the transaction details in your database
    return NextResponse.json({ message: 'Confirmation received successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process confirmation' }, { status: 500 });
  }
}
