import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile/Profile';

describe('2-Testa a página Profile', () => {
  test('1-Testa botões', () => {
    renderWithRouter(<Profile />);

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });
  test('2-Testa se ao clicar no botão de "Done Recipes", a rota é atualizada corretamente', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('3-Testa se ao clicar no botão de "Favorite Recipes", a rota é atualizada corretamente', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('4-Testa se ao clicar no botão de "Logout", a rota é atualizada corretamente', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
