import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';
import { mockUser } from '../../__mocks__/user';

jest.mock('react-i18next', () => ({
  useTranslation: (namespace: string) => ({
    t: (key: string) => key,
  }),
}));

describe('Login Form', () => {
  it('should render login form with input fields and a submit button', () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('submit');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should allow user input in email and password fields', () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    fireEvent.change(emailInput, { target: { value: mockUser.username } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });

    expect(emailInput).toHaveValue(mockUser.username);
    expect(passwordInput).toHaveValue(mockUser.password);
  });
});
