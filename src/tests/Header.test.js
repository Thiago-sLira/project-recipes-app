import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes para o Header', () => {
  test('Se ao clicar no botão Profile, a rota é encaminhada para "./profile"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const titleMeals = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(titleMeals).toBeInTheDocument();

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  });
  test('Se ao clicar no botão SearchBar, é renderizado e removido a barra de busca', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Batata');
    expect(searchInput).toHaveValue('Batata');

    userEvent.click(searchIcon);
    expect(searchInput).not.toBeInTheDocument();
  });
});
