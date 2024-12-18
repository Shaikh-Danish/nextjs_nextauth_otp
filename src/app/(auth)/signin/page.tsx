'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
          body: JSON.stringify({ phone: Number(phoneNumber) }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data.status) {
        throw new Error('Invalid OTP');
      }

      router.push(`/signin/input-otp?number=${phoneNumber}`);
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
                      {/* <div className="text-md block w-[50px] border-b-[2px] border-black bg-transparent p-2 peer-focus:border-primary">
                        +91
                      </div> */}
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
