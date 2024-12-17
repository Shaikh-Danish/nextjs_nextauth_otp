import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        try {
          let user = null;

          //   const { email, password } =
          //     await signInSchema.parseAsync(credentials);

          //   // logic to salt and hash password
          //   const pwHash = saltAndHashPassword(password);

          //   // logic to verify if the user exists
          //   user = await getUserFromDb(email, pwHash);

          if (!user) {
            throw new Error('Invalid credentials.');
          }

          // return JSON object with the user data
          return user;
        } catch (error: any) {
          console.log(error);
          //   if (error instanceof ZodError) {
          // Return `null` to indicate that the credentials are invalid

          return null;
          //   }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id.toString();
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
