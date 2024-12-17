'use client';

import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { doSignIn } from '@/app/actions/signin';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);

      const username = formData.get('username')?.toString();
      const password = formData.get('password')?.toString();

      const response = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (response && response.error) {
        throw new Error(response.error);
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      // toast.error(err.message.split(':')[1]);
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Card className="w-[95%] max-w-[500px] border shadow-2xl">
        <CardHeader className="space-y-3">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleFormSubmit} role="form">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  className="bg-gray-50 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-gray-50 pl-10"
                />
              </div>
            </div>
            <div className="flex">
              <a href="#" className="text-sm text-red-500 hover:text-red-600">
                Forgot password?
              </a>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-red-500 text-white hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
