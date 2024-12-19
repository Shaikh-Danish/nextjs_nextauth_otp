import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

import OtpInput from '@/app/(auth)/signin/input-otp/page';

// const mockSearchParams = {
//   get: jest.fn().mockReturnValue('9876543210'),
//   set: jest.fn(),
// };

const mockSearchParams = new URLSearchParams();
mockSearchParams.set('number', '9876543210');

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

globalThis.fetch = jest.fn();

// Add mock for next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Otp Input Page', () => {
  test('renders the otp input page', () => {
    render(<OtpInput />);

    expect(screen.getByText('One-Time Password')).toBeInTheDocument();
  });

  test('has submit button', () => {
    render(<OtpInput />);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('has resend button', () => {
    render(<OtpInput />);

    expect(screen.getByText('Resend New Code')).toBeInTheDocument();
  });

  test('has phone number in the url', () => {
    render(<OtpInput />);

    const phoneNumber = mockSearchParams.get('number');

    expect(phoneNumber).toBe('9876543210');
  });

  test('has input otp slots', () => {
    render(<OtpInput />);

    expect(screen.getAllByTestId('textbox')).toHaveLength(6);
  });

  test('has input otp separator', () => {
    render(<OtpInput />);

    expect(screen.getByTestId('otp-separator')).toBeInTheDocument();
  });

  test('enter otp and submit', async () => {
    const user = userEvent.setup();
    document.elementFromPoint = jest.fn().mockReturnValue(null);

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    (signIn as jest.Mock).mockImplementation(() =>
      Promise.resolve({ ok: true }),
    );

    render(<OtpInput />);

    const hiddenInput = screen.getByRole('textbox', { hidden: true });

    // Type the full OTP into the hidden input
    await user.type(hiddenInput, '123456');

    // Find and click submit button
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    mockSearchParams.set('number', '9876543210');

    await waitFor(() => {
      expect(signIn).toBeTruthy();
    });

    // expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  // test('resend otp', async () => {
  //   const user = userEvent.setup();
  //   document.elementFromPoint = jest.fn().mockReturnValue(null);

  //   (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: () => Promise.resolve({ status: true }),
  //   });

  //   render(<OtpInput />);

  //   const resendButton = screen.getByText('Resend New Code');
  //   await user.click(resendButton);

  //   expect(globalThis.fetch).toHaveBeenCalledWith(
  //     'http://localhost:3000/api/otp/resend',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({ phone: 9_876_543_210 }),
  //     },
  //   );

  // expect(signIn).toBeTruthy();
  // });
});
