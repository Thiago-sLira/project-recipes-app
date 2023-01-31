import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories, { meals } from '../../cypress/mocks/mealCategories';

describe('Testes para a tela principal de receitas, na rota "/meals"', () => {
  test('Teste se ao carregar a página na rota "/meals", receitas e categorias de comidas são renderizadas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals)
          .mockResolvedValue('segunda requisição de meals')
          .mockResolvedValue('primeira requisição de drinks')
          .mockResolvedValue('nova requisição de meals'),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealCategories),
      });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const firstMeal = await screen.findByTestId('0-card-name');
    expect(firstMeal).toBeInTheDocument();

    // const firstCategoryFilter = screen.getByTestId('Beef-category-filter');
    // expect(firstCategoryFilter.innerHTML).toMatch('Beef');
  });
});
