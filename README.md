# Next.js Phone Authentication Template with Bun

A modern authentication template built with Next.js, Bun, and NextAuth.js. This
template provides a solid foundation for implementing phone number-based OTP
authentication in your Next.js applications.

## Features

- Fast development environment powered by Bun
- Phone number verification using OTP
- Secure session management
- User management system
- Responsive authentication pages
- TypeScript support
- Environment variable configuration

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Shaikh-Danish/nextjs_nextauth_otp.git
cd nextjs_nextauth_otp
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   └── gen-otp/
│   │       └── route.ts
│   ├── (auth)
│   │   ├── signin/
│   │   │   ├── input-otp/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   └── layout.tsx
├── components/
│   └── ui/
├── lib/
│   ├── database-connect.ts
│   ├── user.ts
│   └── otp.ts
└── types/
    └── next-auth.d.ts
```

## Phone Authentication Flow

1. User enters phone number
2. System generates and sends OTP via SMS
3. User enters OTP
4. System verifies OTP
5. If valid, creates authenticated session
