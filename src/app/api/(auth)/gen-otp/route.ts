import { type NextRequest, NextResponse } from 'next/server';

import connectToMongoDatabase from '@/lib/database-connect';
import Otp, { OtpPurpose } from '@/models/otp';
import { getUser } from '@/lib/user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const phone = body?.phone;

    const user = await getUser(phone);

    if (user.status === 'not_found') {
      return NextResponse.json(
        { error: 'User not found' },
        {
          status: 404,
        },
      );
    }

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
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Could not send OTP' },
      {
        status: 500,
      },
    );
  }
}
