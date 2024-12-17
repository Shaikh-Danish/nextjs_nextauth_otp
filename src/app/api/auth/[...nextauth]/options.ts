import bcrypt from 'bcryptjs';
import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
    } & DefaultSession['user'];
  }
  interface User {
    _id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text ', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        return { _id: 'sfs90fusa', id: 'sfs90fusa', name: 'John Smith' };
        // const user = await getUserFromDb(credentials.email, credentials.password);
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
        token._id = user._id.toString();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id;
      }
      return session;
    },
  },
};
