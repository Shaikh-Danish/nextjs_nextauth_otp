// import NextAuth, { DefaultSession } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       _id: string;
//     } & DefaultSession['user'];
//   }
//   interface User {
//     _id: string;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     _id: string;
//   }
// }

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'email@example.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const response = await fetch(
//           'https://your-backend-api.com/auth/login',
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//           },
//         );

//         const user = await response.json();

//         return response.ok && user ? user : undefined;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user._id.toString();
//         token.email = user.email;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user._id = token._id;
//         session.user.email = token.email;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth/signin', // Custom sign-in page (optional)
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

// import { signInSchema } from './lib/zod';
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from '@/utils/password';
// import { getUserFromDb } from '@/utils/db';

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
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
