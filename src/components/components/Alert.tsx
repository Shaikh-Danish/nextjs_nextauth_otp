import React from 'react';

import { Alert as Al, AlertTitle } from '@/components/ui/alert';

interface AlertProps {
  title: string;
  isVisible: boolean;
}

const Alert: React.FC<AlertProps> = ({ title, isVisible }) => {
  return (
    <Al
      className={`${
        isVisible
          ? 'bottom-4 right-3 opacity-100'
          : 'bottom-0 right-3 opacity-0'
      } linear absolute m-0 w-fit bg-red-500 p-4 px-3 text-white transition-all duration-500`}
    >
      <AlertTitle className="m-0 p-0 font-semibold">{title}</AlertTitle>
    </Al>
  );
};

export default Alert;
