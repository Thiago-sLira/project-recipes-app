import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneMealLetter from './mocks/oneMealLetter';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneDrinkLetter from './mocks/oneDrinkLetter';

const searchTopBtnTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const nameSearchRadioTestId = 'name-search-radio';
const execSearchBtnTestId = 'exec-search-btn';
const ingredientSearchRadio = 'ingredient-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';
describe('Testes para o componente SearchBar', () => {
  const zeroCardName = '0-card-name';
  test('Se é possível digitar no input e escolher um dos radios', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');
    expect(searchInput).toHaveValue('Banana');

    const ingredientRadio = screen.getByTestId(ingredientSearchRadio);
    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);

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
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
  });
  test('Se ao clicar no botão de "Search", um fetch é chamado de acordo com a rota "/drinks"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Banana');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalled();
  });
  test('Se ao pesquisar uma receita na rota "/meals", com filtro "First-letter" com mais de uma letra, a requisição não é feita e um alert é renderizado', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });
    window.alert = jest.fn();

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Batata');
    expect(searchInput).toHaveValue('Batata');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);
    userEvent.click(firstLetterRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('Se ao pesquisar uma receita na rota "/meals", com filtro "First-letter" com uma letra, a requisição é realizada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMealLetter),
      });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'a');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);
    userEvent.click(firstLetterRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(async () => {
      const firstIngredientMeal = await screen.findByTestId(zeroCardName);
      expect(firstIngredientMeal.innerHTML).toBe('Apple Frangipan Tart');
    });
  });
  test('Se ao pesquisar uma receita na rota "/meals", com filtro "Ingredient", a requisição é feita de acordo com o filtro', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealsByIngredient),
      });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'chicken');

    const ingredientRadio = screen.getByTestId(ingredientSearchRadio);
    userEvent.click(ingredientRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(async () => {
      const firstIngredientMeal = await screen.findByTestId(zeroCardName);
      expect(firstIngredientMeal.innerHTML).toBe('Brown Stew Chicken');
    });
  });
  test('Se ao fazer uma pesquisa e apenas um item for retornado, o usuário é encaminhado para a rota "/meals/id"', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Spicy Arrabiata Penne');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
  test('Se ao pesquisar uma receita na rota "/drinks", com filtro "First-letter" com mais de uma letra, a requisição não é feita e um alert é renderizado', () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
    window.alert = jest.fn();

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'orange');
    expect(searchInput).toHaveValue('orange');

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('Se ao pesquisar uma receita na rota "/drink", com filtro "Ingredient", a requisição é feita de acordo com o filtro', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinksByIngredient),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Light rum');

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(async () => {
      const firstIngredientMeal = await screen.findByTestId(zeroCardName);
      expect(firstIngredientMeal.innerHTML).toBe('151 Florida Bushwacker');
    });
  });
  test('Se ao fazer uma pesquisa e apenas um item for retornado, o usuário é encaminhado para a rota "/drinks/id"', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneDrink),
      });

    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Aquamarine');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
  test('Se ao pesquisar uma receita na rota "/meals", com filtro "First-letter" com uma letra, a requisição é realizada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneDrinkLetter),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'n');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);
    userEvent.click(firstLetterRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(async () => {
      const firstIngredientMeal = await screen.findByTestId(zeroCardName);
      expect(firstIngredientMeal.innerHTML).toBe('Negroni');
    });
  });
  test('Se ao fazer uma pesquisa e não encontrar nenhum dado, um alert é renderizado informando que nenhuma receita foi encontrada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(emptyMeals),
      });
    window.alert = jest.fn();

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(fetch).toHaveBeenCalledTimes(2);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'Teste');

    const nameRadio = screen.getByTestId(nameSearchRadioTestId);
    userEvent.click(nameRadio);

    const searchButton = screen.getByTestId(execSearchBtnTestId);
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});
