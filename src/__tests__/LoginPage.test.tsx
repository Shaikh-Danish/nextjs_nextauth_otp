import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import SignIn from '@/app/(auth)/signin/page';

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
}));

globalThis.fetch = jest.fn();

describe('LoginPage', () => {
  test('renders the login page', () => {
    render(<SignIn />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders the phone number input', () => {
    render(<SignIn />);

    const phoneNumberInput = screen.getByLabelText('Phone Number');
    expect(phoneNumberInput).toBeInTheDocument();
  });

  test('sets the phone number input value', async () => {
    render(<SignIn />);

    const input = screen.getByPlaceholderText('Enter Phone Number');

    await act(async () => {
      fireEvent.change(input, { target: { value: 9_876_543_210 } });
    });

    await expect(input).toHaveValue(9_876_543_210);
  });

  test('renders the send otp button', () => {
    render(<SignIn />);

    const otpButton = screen.getByText('Send OTP');
    expect(otpButton).toBeInTheDocument();
  });

  test('submits the form', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    render(<SignIn />);
    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    await act(async () => {
      fireEvent.change(input, { target: { value: 9_876_543_210 } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/gen-otp'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: 9_876_543_210 }),
        }),
      );
    });
  });

  test('redirects to the otp page after successful submission', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    render(<SignIn />);
    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    await act(async () => {
      fireEvent.change(input, { target: { value: 9_876_543_210 } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/signin/input-otp?number=9876543210',
      );
    });
  });

  test('submit with empty phone number', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    render(<SignIn />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('submit with 0 phone number', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    render(<SignIn />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    await act(async () => {
      fireEvent.change(input, { target: { value: 0 } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('submit with undefined phone number input', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    render(<SignIn />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    await act(async () => {
      fireEvent.change(input, { target: { value: undefined } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('submit with string phone number input', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });

    render(<SignIn />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
