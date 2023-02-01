import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';

describe('Testes para a tela principal de receitas, na page Recipes.js"', () => {
  // jest.spyOn(global, 'fetch').mockImplementation((url) => {
  //   console.log(url);
  // });
  const zeroCardName = '0-card-name';
  test('Teste se ao carregar a página na rota "/meals", receitas e categorias de comidas são renderizadas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(beefMeals),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
      });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const firstMeal = await screen.findByTestId(zeroCardName);
    expect(firstMeal.innerHTML).toBe('Corba');

    const firstCategoryFilter = screen.getByTestId('Beef-category-filter');
    expect(firstCategoryFilter.innerHTML).toMatch('Beef');

    userEvent.click(firstCategoryFilter);
    await waitFor(async () => {
      const firstBeeflMeal = await screen.findByTestId(zeroCardName);
      expect(firstBeeflMeal.innerHTML).toBe('Beef and Mustard Pie');
    });

    userEvent.click(firstCategoryFilter);
    await waitFor(async () => {
      expect(firstMeal.innerHTML).toBe('Corba');
    });
    expect(fetch).toHaveBeenCalledTimes(4);
  });
  test('Teste se ao carregar a página na rota "/drinks", receitas e categorias de bebibas são renderizadas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(ordinaryDrinks),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const firstDrink = await screen.findByTestId(zeroCardName);
    expect(firstDrink.innerHTML).toBe('GG');

    const firstCategoryFilter = screen.getByTestId('Ordinary Drink-category-filter');
    expect(firstCategoryFilter.innerHTML).toMatch('Ordinary Drink');

    userEvent.click(firstCategoryFilter);
    await waitFor(async () => {
      const firstOrdinaryDrink = await screen.findByTestId(zeroCardName);
      expect(firstOrdinaryDrink.innerHTML).toBe('3-Mile Long Island Iced Tea');
    });

    userEvent.click(firstCategoryFilter);
    await waitFor(async () => {
      expect(firstDrink.innerHTML).toBe('GG');
    });
    expect(fetch).toHaveBeenCalledTimes(4);
  });
  test('Teste se ao clicar no botão de "All", todas as receitas da rota atual são renderizadas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(ordinaryDrinks),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const firstDrink = await screen.findByTestId(zeroCardName);
    expect(firstDrink.innerHTML).toBe('GG');

    const firstCategoryFilter = screen.getByTestId('Ordinary Drink-category-filter');
    expect(firstCategoryFilter.innerHTML).toMatch('Ordinary Drink');

    userEvent.click(firstCategoryFilter);
    await waitFor(async () => {
      const firstOrdinaryDrink = await screen.findByTestId(zeroCardName);
      expect(firstOrdinaryDrink.innerHTML).toBe('3-Mile Long Island Iced Tea');
    });

    const allCategoryFilter = screen.getByTestId('All-category-filter');
    userEvent.click(allCategoryFilter);
    await waitFor(async () => {
      expect(firstDrink.innerHTML).toBe('GG');
    });
    expect(fetch).toHaveBeenCalledTimes(4);
  });
});
