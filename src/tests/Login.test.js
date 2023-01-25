import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_TEST = 'NAME@EXAMPLE.COM';
const PASSWORD_TEST = '1234567';

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
  test('3-Se existe um botão e inicia desabilitado', () => {
    renderWithRouter(<App />);
    const btnLogin = screen.getByRole('button', { name: /login/i });
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();
  });
  test('4-Se ao clicar no botão o usuário é redirecionado para a rota "Meals"', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const buttonLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(inputEmail, EMAIL_TEST);
    userEvent.type(inputPassword, PASSWORD_TEST);
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/meals');
  });
  test('5-Se o email e senha forem validados, o botão habilita', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, EMAIL_TEST);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, PASSWORD_TEST);
    const btnLogin = screen.getByRole('button', { name: /login/i });
    expect(btnLogin).not.toBeDisabled();
  });
});
