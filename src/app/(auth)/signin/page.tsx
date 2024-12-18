// 'use client';

// import { Lock, Mail } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';

// import { doSignIn } from '@/app/actions/signin';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export default function LoginForm() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData(event.target as HTMLFormElement);

//       const phoneNumber = formData.get('phoneNumber')?.toString();

//       const response = await signIn('credentials', {
//         redirect: false,
//       });

//       if (response && response.error) {
//         throw new Error(response.error);
//       } else {
//         router.push('/');
//       }
//     } catch (error: any) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex h-dvh w-full items-center justify-center">
//       <Card className="w-[95%] max-w-[500px] border shadow-2xl">
//         <CardHeader className="space-y-3">
//           <div className="flex justify-center">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
//               <Lock className="h-6 w-6 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-center text-2xl font-bold">
//             Welcome back
//           </CardTitle>
//           <CardDescription className="text-center">
//             Enter your credentials to access your account
//           </CardDescription>
//         </CardHeader>

//         <form onSubmit={handleFormSubmit} role="form">
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
//                 <Input
//                   id="username"
//                   name="username"
//                   placeholder="Enter your username"
//                   required
//                   className="bg-gray-50 pl-10"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                   className="bg-gray-50 pl-10"
//                 />
//               </div>
//             </div>
//             <div className="flex">
//               <a href="#" className="text-sm text-red-500 hover:text-red-600">
//                 Forgot password?
//               </a>
//             </div>
//           </CardContent>

//           <CardFooter className="flex flex-col space-y-4">
//             <Button
//               type="submit"
//               className="w-full bg-red-500 text-white hover:bg-red-600"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Signing in...' : 'Sign in'}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Alert from '@/components/components/Alert';
import Loading from '@/components/components/loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { clientEnvironment } from '@/config/environment';

const formSchema = z.object({
  phone_number: z.number(),
});

export default function Page() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = React.useState(0);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: phoneNumber,
    },
  });

  async function onSubmit() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${clientEnvironment.NEXT_PUBLIC_SERVER_URL}/api/gen-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: Number(`91${phoneNumber}`) }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data.status) {
        throw new Error('Invalid OTP');
      }

      router.push(`/signin/input-otp?number=${Number(`91${phoneNumber}`)}`);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-dvh w-dvw items-center justify-center p-4 lg:p-8">
      <div
        className={`mx-auto w-full flex-col justify-center space-y-6 sm:w-[400px] ${
          isLoading ? 'hidden' : 'flex'
        }`}
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-md font-medium text-muted-foreground">
            Enter your phone number below to login to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Phone Number</FormLabel>
                  <FormControl>
                    <div className="peer-container flex flex-row-reverse">
                      <input
                        placeholder="Enter Phone Number"
                        type="number"
                        className="text-md peer block w-[100%] border-b-[2px] border-black bg-transparent py-2 outline-none focus:border-primary"
                        onChange={event =>
                          setPhoneNumber(Number(event.target.value))
                        }
                      />
                      <div className="text-md block w-[50px] border-b-[2px] border-black bg-transparent p-2 peer-focus:border-primary">
                        +91
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="block w-[100%] bg-primary py-2 text-white"
            >
              Send OTP
            </Button>
          </form>
        </Form>
        {/* <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p> */}
      </div>

      <Alert title={'Failed to send otp'} isVisible={isError} />

      <Loading isVisible={isLoading} />
    </div>
  );
}
