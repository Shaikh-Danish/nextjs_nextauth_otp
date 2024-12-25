'use client';

import React from 'react';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import OtpInput from '@/components/auth/OtpInput';

function InputOtpForm({
  phoneNumber,
  handleChangeSubmitError,
}: Readonly<{
  handleChangeFormType: (type: 'login' | 'otp') => void;
  handleChangeSubmitError: (error: string) => void;
  phoneNumber: number;
}>) {
  return (
    <>
      <div className="relative flex h-dvh w-dvw items-center justify-center p-4 lg:p-8">
        <div className="absolute left-[-20px] top-4">
          <Button className="h-10 w-10 bg-transparent hover:bg-transparent">
            <ArrowLeft className="h-10 w-10" />
          </Button>
        </div>

        <div>
          <OtpInput
            phoneNumber={phoneNumber}
            handleChangeSubmitError={handleChangeSubmitError}
          />
        </div>
      </div>
    </>
  );
}

export default InputOtpForm;
