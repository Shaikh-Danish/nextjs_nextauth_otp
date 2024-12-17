'use server';

import { signIn } from 'next-auth/react';

export const doSignIn = async (formData: FormData) => {
  try {
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    const response = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    return response;
  } catch (error: any) {
    return { error: error.message };
  }
};
