import React from 'react';

import { InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

function OtpSlots() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <InputOTPSlot
          key={index}
          index={index}
          className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
          data-testid="textbox"
        />
      ))}

      <InputOTPSeparator data-testid="otp-separator" />

      {Array.from({ length: 3 }).map((_, index) => (
        <InputOTPSlot
          key={index + 3}
          index={index + 3}
          className="w-[50px] border-[1px] border-gray-400 outline-1 outline-[#DEF9C4]"
          data-testid="textbox"
        />
      ))}
    </>
  );
}

export default OtpSlots;
