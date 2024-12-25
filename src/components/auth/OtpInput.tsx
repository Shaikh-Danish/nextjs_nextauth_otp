'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';

import { setUser } from '@/redux/features/user-slice';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { InputOTP } from '@/components/ui/input-otp';

import OtpSlots from '@/components/auth/OtpSlots';
import ButtonWithSpinner from '@/components/components/ButtonWithSpinner';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

function OtpInput({
  phoneNumber,
  handleChangeSubmitError,
}: {
  phoneNumber: number;
  handleChangeSubmitError: (error: string) => void;
}) {
  const dispatch = useDispatch();
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

        dispatch(setUser({ phone: phoneNumber }));

        router.push(`/`);
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
                    <OtpSlots />
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

        <ButtonWithSpinner
          isLoading={isLoading}
          buttonText="Submit"
          buttonType="submit"
        />
      </form>
    </Form>
  );
}

export default OtpInput;
