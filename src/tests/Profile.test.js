import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile/Profile';

const EMAIL_TEST = 'NAME@EXAMPLE.COM';
const PASSWORD_TEST = '1234567';

describe('Testa a página Profile', () => {
  test('Testa inputs de login ', () => {
    renderWithRouter(<Profile />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, EMAIL_TEST);
    expect(emailInput).toHaveValue(EMAIL_TEST);

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, PASSWORD_TEST);
    expect(passwordInput).toHaveValue(PASSWORD_TEST);

    const loginBtn = screen.getByRole('button', { name: /login/i });
    userEvent.click(loginBtn);
  });
});
