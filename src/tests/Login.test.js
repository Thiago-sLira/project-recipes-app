import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_TEST = 'NAME@EXAMPLE.COM';
const PASSWORD_TEST = '123456';

describe('Teste página Login', () => {
  test('1-Se o input de email existe', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, EMAIL_TEST);
    expect(inputEmail).toHaveValue(EMAIL_TEST);
  });
  test('2-Se o input de senha existe e se é possível digitar nele', () => {
    renderWithRouter(<App />);

    const inputPassword = screen.getByPlaceholderText(/password/i);
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, PASSWORD_TEST);
    expect(inputPassword).toHaveValue(PASSWORD_TEST);
  });
});
