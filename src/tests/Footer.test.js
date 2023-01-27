import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes para o componente Footer', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
  });

  test('Se ao clicar no botão de drinks, a tela em encaminhada para a rota "/drinks"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();

    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Se ao clicar no botão de meals, a tela em encaminhada para a rota "/meals"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    userEvent.click(mealsIcon);
    expect(history.location.pathname).toBe('/meals');
  });
  test('Se o botão de drinks e meals estão nas tela de profile', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
  });
});
