'use client';

import React from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import classNames from 'classnames';

import ClipLoader from 'react-spinners/ClipLoader';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { useToast } from '@/hooks/use-toast';

import { clientEnvironment } from '@/config/environment';

const formSchema = z.object({
  phone_number: z.number(),
});

function LoginForm({
  handleChangeFormType,
  handleChangePhoneNumber,
  phoneNumber,
}: Readonly<{
  handleChangeSubmitError: (error: string) => void;
  handleChangeFormType: (type: 'login' | 'otp') => void;
  handleChangePhoneNumber: (phoneNumber: number) => void;
  phoneNumber: number;
}>) {
  const { toast } = useToast();

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
      if (
        typeof phoneNumber !== 'number' ||
        phoneNumber === 0 ||
        Number.isNaN(phoneNumber) ||
        phoneNumber === undefined
      ) {
        toast({
          title: 'Error',
          description: 'Phone number is required',
          variant: 'destructive',
        });

        throw new Error('Phone number is required');
      }

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

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      handleChangeFormType('otp');

      toast({
        title: 'OTP sent',
        description: 'OTP sent to your phone number',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-md font-medium text-muted-foreground">
          Enter your phone number below to login to your account
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
          role="form"
        >
          <FormField
            control={form.control}
            name="phone_number"
            render={() => (
              <FormItem>
                <FormLabel className="text-md">Phone Number</FormLabel>

                <FormControl>
                  <input
                    placeholder="Enter Phone Number"
                    type="number"
                    className="text-md peer block w-[100%] border-b-[2px] border-black bg-transparent p-2 outline-none focus:border-primary"
                    onChange={event =>
                      handleChangePhoneNumber(Number(event.target.value))
                    }
                  />
                </FormControl>
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
            {isLoading ? <ClipLoader color="#5766db" size={20} /> : 'Send OTP'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
