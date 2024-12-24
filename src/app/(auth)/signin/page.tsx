'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Alert from '@/components/components/Alert';

import { useToast } from '@/hooks/use-toast';

import { clientEnvironment } from '@/config/environment';

import LoginForm from '@/components/auth/LoginForm';
import InputOtpForm from '@/components/auth/InputOtpForm';

export default function Page() {
  const [submitError, setSubmitError] = React.useState<string>('');

  const [phoneNumber, setPhoneNumber] = React.useState(0);

  const [formType, setFormType] = React.useState<'login' | 'otp'>('login');

  const handleChangeFormType = (type: 'login' | 'otp') => {
    setFormType(type);
  };

  const handleChangeSubmitError = (error: string) => {
    setSubmitError(error);
  };

  const handleChangePhoneNumber = (phoneNumber: number) => {
    setPhoneNumber(phoneNumber);
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center p-4 lg:p-8">
      {formType === 'login' ? (
        <LoginForm
          handleChangeSubmitError={handleChangeSubmitError}
          handleChangeFormType={handleChangeFormType}
          handleChangePhoneNumber={handleChangePhoneNumber}
          phoneNumber={phoneNumber}
        />
      ) : (
        <InputOtpForm
          handleChangeSubmitError={handleChangeSubmitError}
          handleChangeFormType={handleChangeFormType}
          phoneNumber={phoneNumber}
        />
      )}

      <Alert title={submitError} isVisible={submitError.length > 0} />
    </div>
  );
}
