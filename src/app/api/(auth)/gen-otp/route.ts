import { type NextRequest, NextResponse } from 'next/server';

import connectToMongoDatabase from '@/lib/database-connect';
import Otp, { OtpPurpose } from '@/models/otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const phone = body?.phone;

    await connectToMongoDatabase();

    const otp = await Otp.generateAndSaveOtp(OtpPurpose.LOGIN, phone);

    if (!otp) {
      return NextResponse.json(
        { error: 'Could not send OTP' },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      { status: true },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Could not send OTP' },
      {
        status: 500,
      },
    );
  }
}
