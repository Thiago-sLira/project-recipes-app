import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { doneRecipes } from './mocks/localStorage';

const routeDoneRecipes = ['/done-recipes'];
describe('Testes para a page "DoneRecipes"', () => {
  navigator.clipboard = { writeText: jest.fn() };
  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  afterEach(() => {
    window.localStorage.clear();
  });
  test('Se ao renderizar a tela, as receitas feitas no localStorage são renderizadas', async () => {
    renderWithRouter(<App />, { initialEntries: routeDoneRecipes });

    const firstDoneRecipeImage = screen.getByTestId('0-horizontal-image');
    expect(firstDoneRecipeImage).toBeInTheDocument();
  });
  test('Se ao clicar no botão de compartilhar, uma mensagem indicando que o link foi copiado renderiza', async () => {
    renderWithRouter(<App />, { initialEntries: routeDoneRecipes });

    const firstDoneRecipeShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(firstDoneRecipeShareBtn).toBeInTheDocument();

    userEvent.click(firstDoneRecipeShareBtn);

    const linkCopiedMessage = await screen.findByRole('heading', { name: 'Link copied!', level: 4 });
    expect(linkCopiedMessage).toBeInTheDocument();
  });
  test('Se ao clicar nos filtros, as receitas são filtradas corretamente', () => {
    renderWithRouter(<App />, { initialEntries: routeDoneRecipes });

    const filterButtonAll = screen.getByTestId('filter-by-all-btn');
    const filterButtonMeals = screen.getByTestId('filter-by-meal-btn');
    const filterButtonDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(filterButtonAll).toBeInTheDocument();
    expect(filterButtonMeals).toBeInTheDocument();
    expect(filterButtonDrinks).toBeInTheDocument();

    const mealSpicyArrabiataPenne = screen.getByText(/spicy arrabiata penne/i);
    const drinkAquamarine = screen.getByText(/aquamarine/i);

    expect(mealSpicyArrabiataPenne).toBeInTheDocument();
    expect(drinkAquamarine).toBeInTheDocument();

    userEvent.click(filterButtonMeals);

    expect(drinkAquamarine).not.toBeInTheDocument();
    expect(mealSpicyArrabiataPenne).toBeInTheDocument();

    userEvent.click(filterButtonDrinks);

    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();

    userEvent.click(filterButtonAll);

    expect(screen.queryByText(/spicy arrabiata penne/i)).toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });
});
