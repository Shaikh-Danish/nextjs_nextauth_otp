import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import LoginForm from '@/app/(auth)/signin/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock fetch globally
globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ status: true }),
  }),
);

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('SignIn Page', () => {
  test('renders signin page', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('allows entering phone number', async () => {
    render(<LoginForm />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    await waitFor(async () => {
      fireEvent.change(input, { target: { value: 9_876_543_210 } });
      await expect(input).toHaveValue(9_876_543_210);
    });
  });

  test('shows loading state when submitting', async () => {
    // Mock fetch to delay response
    globalThis.fetch.mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            resolve({
              ok: true,
              json: () => Promise.resolve({ status: true }),
            });
          }, 100),
        ),
    );

    render(<LoginForm />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    // Fill and submit form
    await waitFor(() => {
      fireEvent.change(input, { target: { value: 9_876_543_210 } });
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    // Check for loading state
    await waitFor(
      () => {
        expect(screen.queryByTestId('loading')).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  test('handles API error correctly', async () => {
    // Mock fetch to return error
    globalThis.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error')),
    );

    render(<LoginForm />);

    const input = screen.getByPlaceholderText('Enter Phone Number');
    const submitButton = screen.getByText('Send OTP');

    // Fill and submit form
    await waitFor(() => {
      fireEvent.change(input, { target: { value: 9_876_543_210 } });
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    // Check that loading state is removed after error
    await waitFor(
      () => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
});
