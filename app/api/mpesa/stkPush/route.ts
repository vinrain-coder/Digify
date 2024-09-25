import axios from 'axios';
import { NextResponse } from 'next/server';

const mpesaCredentials = {
  consumerKey: process.env.MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
  shortCode: process.env.MPESA_SHORTCODE!,
  passkey: process.env.MPESA_PASSKEY!,
};

async function getMpesaAccessToken() {
  const auth = Buffer.from(`${mpesaCredentials.consumerKey}:${mpesaCredentials.consumerSecret}`).toString('base64');
  const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data.access_token;
}

export async function POST(request: Request) {
  try {
    const { phone, amount } = await request.json();
    const accessToken = await getMpesaAccessToken();
    const timeStamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);

    const data = {
      BusinessShortCode: mpesaCredentials.shortCode,
      Password: Buffer.from(`${mpesaCredentials.shortCode}${mpesaCredentials.passkey}${timeStamp}`).toString('base64'),
      Timestamp: timeStamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: mpesaCredentials.shortCode,
      PhoneNumber: phone,
      CallBackURL: "https://miniature-pancake-v6vw7pv5p74r3pp4g.github.dev/api/mpesa/confirmation",
      AccountReference: "Shoepedi",
      TransactionDesc: "Payment for cart",
    };

    const mpesaResponse = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(mpesaResponse.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
