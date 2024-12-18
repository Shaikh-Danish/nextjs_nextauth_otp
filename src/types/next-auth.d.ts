import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    phoneNumber: string;
  }

  interface Session {
    phoneNumber: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    phoneNumber: string;
  }
}
