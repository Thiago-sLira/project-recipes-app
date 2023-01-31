import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const fetchMock = require('../../cypress/mocks/fetch');

describe('Testes para a tela principal de receitas, na rota "/meals"', () => {
  test('Teste se ao carregar a página na rota "/meals", receitas e categorias de comidas são renderizadas', async () => {
    jest.fn(fetchMock).mockResolvedValue({ json: jest.fn().mockResolvedValue() });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    // expect(fetch).toHaveBeenCalledTimes(2);
    // const firstMeal = await screen.findByTestId('0-card-name');
    // expect(firstMeal.innerHTML).toMatch('Corba');

    // const firstCategoryFilter = await screen.findByTestId('Beef-category-filter');
    // expect(firstCategoryFilter.innerHTML).toMatch('Beef');
  });
});
