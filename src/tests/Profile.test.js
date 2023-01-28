import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile/Profile';

const EMAIL_TEST = 'NAME@EXAMPLE.COM';

describe('2-Testa a página Profile', () => {
  test.skip('Testa inputs de login ', () => {
    renderWithRouter(<Profile />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, EMAIL_TEST);
    expect(emailInput).toHaveValue(EMAIL_TEST);
  });
  test('2-Testa botões', () => {
    renderWithRouter(<Profile />);

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });
});
