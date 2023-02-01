import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes para a page RecipeDetails de acordo com cada rota', () => {
  test('Se a requisição retornar um erro, o erro é mostrado na tela na rota "/drinks/178319"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error()),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks/178319'] });
  });
  test('Se a requisição retornar um erro, o erro é mostrado na tela na rota "/meals/52768"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error()),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals/52768'] });
  });
});
