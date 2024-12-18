'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { Suspense } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
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
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
// import { updateUser } from '@/redux/features/user-slice';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

function PhoneSearchParams({ setPhoneNumber }: { setPhoneNumber: any }) {
  const searchParams = useSearchParams();

  const phoneNumber = searchParams.get('number');

  React.useEffect(() => {
    setPhoneNumber(phoneNumber);
  }, [phoneNumber, setPhoneNumber]);

  return <></>;
}

export default function InputOTPForm() {
  const router = useRouter();
  //   const dispatch = useDispatch();

  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState<number | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setIsError(false);

    console.log(data.pin, phoneNumber);

    try {
      const response = await signIn('credentials', {
        otp: data.pin,
        phone: phoneNumber,
      });

      console.log(response);

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-otp`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       otp: data.pin,
      //       phone: phoneNumber,
      //     }),
      //   },
      // );

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const result = await response.json();

      // if (result.success) {
      // dispatch(updateUser(result.data));
      //   router.push(`/`);
      // } else {
      //   throw new Error(result.message || 'OTP verification failed');
      // }
    } catch {
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => setIsError(false), 5000);
    }
  }

  return (
    <>
      <Suspense>
        <PhoneSearchParams setPhoneNumber={setPhoneNumber} />
      </Suspense>

      <div className="flex h-dvh w-dvw items-center justify-center p-4 lg:p-8">
        <div className={`${isLoading ? 'hidden' : 'flex'}`}>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[100%] space-y-4"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <div className="flex w-[100%] items-center justify-between">
                            <InputOTPSlot
                              index={0}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                            />
                            <InputOTPSeparator />
                            <InputOTPSlot
                              index={3}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                            />
                          </div>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="block w-[100%] bg-primary py-2 text-white"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="flex flex-col items-center justify-center">
              <p className="text-sm">Didn&apos;t Receive any code?</p>
              <p
                className="cursor-pointer text-[14px] text-primary/[0.5] hover:text-primary"
                onClick={() => ''}
              >
                Resend New Code
              </p>
            </div>
          </div>

          <Alert
            title={
              'The OTP is invalid or has expired. Please enter a valid code or request a new one.'
            }
            isVisible={isError}
          />
        </div>

        <Loading isVisible={isLoading} />
      </div>
    </>
  );
}