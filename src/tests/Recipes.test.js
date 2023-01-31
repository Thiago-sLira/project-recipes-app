import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import beefMeals from '../../cypress/mocks/beefMeals';

describe('Testes para a tela principal de receitas, na rota "/meals"', () => {
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
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });

    // jest.spyOn(global, 'fetch').mockImplementation((url) => {
    //   console.log(url);
    // });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    // expect(fetch).toHaveBeenCalled();
    const firstMeal = await screen.findByTestId('0-card-name');
    expect(firstMeal).toBeInTheDocument();

    // const firstCategoryFilter = screen.getByTestId('Beef-category-filter');
    // expect(firstCategoryFilter.innerHTML).toMatch('Beef');
  });
});
