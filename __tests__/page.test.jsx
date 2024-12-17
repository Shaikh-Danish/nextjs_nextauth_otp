import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginForm from '../src/app/page';

describe('LoginForm', () => {
  test('renders login form with all elements', () => {
    render(<LoginForm />);

    // Check for main elements
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(
      screen.getByText('Enter your credentials to access your account'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email or Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  test('shows loading state when form is submitted', async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    const form = screen.getByRole('form'); // Add this line

    // Use form submit instead of button click
    fireEvent.submit(form);

    // Check loading state
    expect(submitButton).toHaveTextContent('Signing in...'); // Changed this line
    await expect(submitButton).toBeDisabled();

    // Wait for loading state to finish
    await waitFor(
      async () => {
        expect(submitButton).toHaveTextContent('Sign in');
        await expect(submitButton).toBeEnabled();
      },
      { timeout: 1100 },
    );
  });

  test('requires email and password fields', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email or Username');
    const passwordInput = screen.getByLabelText('Password');

    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });
});
