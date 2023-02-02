import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import drinks from '../../cypress/mocks/drinkCategories';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testes para a page RecipeDetails de acordo com cada rota', () => {
  test.skip('Se a requisição retornar um erro, o erro é mostrado na tela na rota "/drinks/178319"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error()),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks/178319'] });
  });
  test.skip('Se a requisição retornar um erro, o erro é mostrado na tela na rota "/meals/52768"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error()),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals/52768'] });
  });
  test('Verificando quais fetchs são chamados ao carregar a página', () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      console.log(url);
    });
    renderWithRouter(<App />, { initialEntries: ['/meals/52768'] });
  });
  test('Teste', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
  });
});
