import React from 'react';

import classNames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import { Button } from '../ui/button';

function ButtonWithSpinner({
  isLoading,
  buttonText,
  buttonType,
  children,
}: {
  isLoading: boolean;
  buttonText: string;
  buttonType: 'submit' | 'button' | 'reset';
  children?: React.ReactNode;
}) {
  return (
    <Button
      type={buttonType}
      className={classNames({
        'flex w-[100%] justify-center py-2 shadow-xl': true,
        'bg-primary text-white': !isLoading,
        'border border-primary bg-white hover:bg-white': isLoading,
      })}
    >
      {isLoading ? <ClipLoader color="#5766db" size={20} /> : buttonText}
      {children && children}
    </Button>
  );
}

export default ButtonWithSpinner;
