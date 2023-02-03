import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import { favoriteRecipe } from './mocks/localStorage';
import { allCheckboxChecked } from './mocks/inProgress';

const btnFinishRecipe = 'finish-recipe-btn';
const routeMeals = ['/meals/52771/in-progress'];
const whiteHeartIcon = 'whiteHeartIcon.svg';
const favoriteBtn = 'favorite-btn';
describe('Testes para o componente RecipeDetails', () => {
  navigator.clipboard = { writeText: jest.fn() };
  test('Testa se os elemento drinks aparece na tela', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/17222/in-progress/');
    });
  });
  test('Testa botão Favoritar na Drink', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks/15997/in-progress/');
    });
    const favoriteBtnDrink = screen.getByTestId(favoriteBtn);
    userEvent.click(favoriteBtnDrink);
  });
  test('Testa se os elemento meals aparece na tela', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/53049/in-progress/');
    });
  });
  test('Testa botão Favoritar na Meal', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals/53049/in-progress/');
    });
    const favoriteBtnMeal = screen.getByTestId(favoriteBtn);
    userEvent.click(favoriteBtnMeal);
  });
  test('Testa botão checkbox na Drink', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks/15997/in-progress/');
    });
    const finishRecipeBtn = screen.getByTestId(btnFinishRecipe);
    expect(finishRecipeBtn).toBeDisabled();

    const checkbox1 = screen.queryAllByRole('checkbox');
    checkbox1.forEach((box) => userEvent.click(box));

    expect(finishRecipeBtn).toBeEnabled();

    userEvent.click(finishRecipeBtn);
    await act(async () => {
      history.push('/done-recipes');
    });
  });
  test('Se ao carregar a página com uma receita favoritada, ela inicia como favoritada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(1);

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
  });
  test('Se ao clicar no botão de compartilhar, um texto é renderizado informando que o link foi copiado', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    renderWithRouter(<App />, { initialEntries: routeMeals });

    const shareButton = await screen.findByRole('button', { name: /shareicon/i });
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
  });
  test('A tela com uma receita com todas os ingredientes usados', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(allCheckboxChecked));

    renderWithRouter(<App />, { initialEntries: routeMeals });
  });
});
