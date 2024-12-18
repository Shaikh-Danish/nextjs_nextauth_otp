import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import connectToMongoDatabase from '@/lib/database-connect';
import Otp, { OtpPurpose } from '@/models/otp';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        phone: {
          label: 'Phone Number',
          type: 'text ',
          placeholder: '8623827423',
        },
        otp: {
          label: 'OTP',
          type: 'text',
          placeholder: '123456',
        },
      },
      authorize: async credentials => {
        await connectToMongoDatabase();

        const phoneNumber = Number(credentials?.phone);
        const otp = Number(credentials?.otp);

        const otpDocument = await Otp.verifyOtp(
          Number(phoneNumber),
          otp,
          OtpPurpose.LOGIN,
        );

        if (!otpDocument) {
          throw new Error('Invalid OTP');
        }

        return { id: 'tete', _id: 'tete', phoneNumber: '8623827423' };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      if (user) {
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      if (session) {
        session.phoneNumber = token.phoneNumber;
      }
      return session;
    },
  },
};
