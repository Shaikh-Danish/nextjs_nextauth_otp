'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import classNames from 'classnames';

import ClipLoader from 'react-spinners/ClipLoader';

import { ArrowLeft } from 'lucide-react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { useToast } from '@/hooks/use-toast';

import Alert from '@/components/components/Alert';

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

function InputOtpForm({
  handleChangeFormType,
  handleChangeSubmitError,
  phoneNumber,
}: Readonly<{
  handleChangeFormType: (type: 'login' | 'otp') => void;
  handleChangeSubmitError: (error: string) => void;
  phoneNumber: number;
}>) {
  const router = useRouter();
  const { toast } = useToast();

  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await signIn('credentials', {
        otp: data.pin,
        phone: phoneNumber,
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
        return;
      }

      if (response?.ok) {
        toast({
          title: 'Success',
          description: 'Successfully logged in!',
        });
        router.push(`/?number=${phoneNumber}`);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="relative flex h-dvh w-dvw items-center justify-center p-4 lg:p-8">
        <div className="absolute left-[-20px] top-4">
          <Button className="h-10 w-10 bg-transparent hover:bg-transparent">
            <ArrowLeft className="h-10 w-10" />
          </Button>
        </div>
        <div>
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
                              data-testid="textbox"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                              data-testid="textbox"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                              data-testid="textbox"
                            />
                            <InputOTPSeparator data-testid="otp-separator" />
                            <InputOTPSlot
                              index={3}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                              data-testid="textbox"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                              data-testid="textbox"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
                              data-testid="textbox"
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
                  className={classNames({
                    'flex w-[100%] justify-center py-2 shadow-xl': true,
                    'bg-primary text-white': !isLoading,
                    'border border-primary bg-white hover:bg-white': isLoading,
                  })}
                >
                  {isLoading ? (
                    <ClipLoader color="#5766db" size={20} />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </Form>

            <div className="flex flex-col items-center justify-center">
              <p className="text-sm">Didn&apos;t Receive any code?</p>
              <p
                className="cursor-pointer text-[14px] text-primary/[0.75] hover:text-primary"
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
      </div>
    </>
  );
}

export default InputOtpForm;
