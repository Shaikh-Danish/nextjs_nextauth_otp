import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import connectToMongoDatabase from '@/lib/database-connect';
import { getUser } from '@/lib/user';
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
        try {
          await connectToMongoDatabase();

          const phoneNumber = Number(credentials?.phone);
          const otp = credentials?.otp;

          const otpDocument = await Otp.verifyOtp(
            phoneNumber,
            otp ?? '',
            OtpPurpose.LOGIN,
          );

          if (!otpDocument) {
            throw new Error('Invalid OTP');
          }

          const user = await getUser(phoneNumber);

          if (user.status === 'not_found') {
            throw new Error('User not found');
          }

          return {
            id: credentials?.phone ?? '',
            phoneNumber: credentials?.phone ?? '',
          };
        } catch (error: any) {
          throw new Error(error?.message || 'Authentication failed');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.phoneNumber = token.phoneNumber;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('error')) {
        return baseUrl;
      }

      return url;
    },
  },
};
