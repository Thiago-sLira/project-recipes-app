import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

import App from '../App';

const btnFinishRecipe = 'finish-recipe-btn';

describe('Testes para o componente RecipeDetails', () => {
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
    const favoriteBtnDrink = screen.getByTestId('favorite-btn');
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
    const favoriteBtnMeal = screen.getByTestId('favorite-btn');
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
});
