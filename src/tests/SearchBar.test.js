import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const searchTopBtnTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const nameSearchRadioTestId = 'name-search-radio';
const execSearchBtnTestId = 'exec-search-btn';
describe('Testes para o componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(),
    });
  });
  test('Se é possível digitar no input e escolher um dos radios', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');
    expect(searchInput).toHaveValue('Banana');

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).not.toBeChecked();
  });
  test('Se o botão desabilita caso não tenha nada digitado no input ou nenhum radio tenha sido clicado', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    expect(searchButton).toBeDisabled();

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');
    expect(searchInput).toHaveValue('Banana');
    expect(searchButton).toBeDisabled();

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);
    expect(searchButton).toBeEnabled();

    userEvent.clear(searchInput);
    expect(searchButton).toBeDisabled();
  });
  test('Se ao clicar no botão de "Search", um fetch é chamado de acordo com a rota "/meals"', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('Se ao clicar no botão de "Search", um fetch é chamado de acordo com a rota "/drinks"', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
