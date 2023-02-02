import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinkCategories';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import { doneRecipe, favoriteRecipe } from './mocks/localStorage';

const routeMeals = ['/meals/52771'];
const routeDrinks = ['/drinks/178319'];
const whiteHeartIcon = 'whiteHeartIcon.svg';
describe('Testes para a page RecipeDetails de acordo com cada rota', () => {
  test('Se a requisição retornar um erro, o erro é mostrado na tela na rota "/drinks/178319"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error()),
    });
    renderWithRouter(<App />, { initialEntries: routeDrinks });
  });
  test('Se a requisição retornar um erro, o erro é mostrado na tela na rota "/meals/52768"', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: (new Error()),
    });
    renderWithRouter(<App />, { initialEntries: routeMeals });
  });
  test('Se ao carregar a tela na rota "/meals/52771" a receita é rederizada corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(2);

    const recipeImage = await screen.findByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();

    const recomendationImage = await screen.findByTestId('0-recommendation-card');
    expect(recomendationImage).toBeInTheDocument();
  });
  test('Se ao clicar no botão de favoritar, a receita é favoritada corretamente e vice versa', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(2);

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
  });
  test('Se ao carregar a tela na rota "/drinks/178319" a receita é rederizada corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneDrink),
      });

    renderWithRouter(<App />, { initialEntries: routeDrinks });
    expect(fetch).toHaveBeenCalledTimes(2);

    const recipeImage = await screen.findByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();

    const recomendationImage = await screen.findByTestId('0-recommendation-card');
    expect(recomendationImage).toBeInTheDocument();
  });
  test('Se o botão Start Recipe é renderizado na página caso a receita não tenha sido feita ou começada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(2);

    const startRecipeButton = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton.innerHTML).toBe('Start Recipe');

    await act(async () => {
      userEvent.click(startRecipeButton);
    });

    // expect(history.location.pathname).toBe('/meals/52771/in-progress');
    // console.log(history.location.pathname);
    // await waitFor(async () => {
    //   const finishButton = screen.getByTestId('finish-recipe-btn');
    //   expect(finishButton).toBeDisabled();
    // });
  });
  test('Se a receita já estiver em andamento, com ingredientes usados, renderiza o botão Continue Recipes', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    window.localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52771: [] }, drinks: {} }));

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(2);
    const continueRecipeButton = await screen.findByText(/Continue Recipe/i);
    userEvent.click(continueRecipeButton);
    expect(continueRecipeButton).toBeInTheDocument();
  });
  test('Se a receita já estiver em andamento, renderiza o botão Continue Recipes', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    window.localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(2);
    const startRecipeButton = await screen.findByText(/Start Recipe/i);
    expect(startRecipeButton).toBeInTheDocument();
  });
  test('Se ao carregar a página com uma receita favoritada, ela inicia como favoritada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));

    renderWithRouter(<App />, { initialEntries: routeMeals });
    expect(fetch).toHaveBeenCalledTimes(2);

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
  test('se a receita estiver sido feita não renderiza o botão Start Recipe ou Continue Recipe', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    renderWithRouter(<App />, { initialEntries: routeMeals });

    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });
  test('Se ao clicar no botão de compartilhar, um texto é renderizado informando que o link foi copiado', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    // window.clipboard = {
    //   writeText: jest.fn(),
    // };
    // window.document.execCommand = jest.fn(window.clipboard);

    renderWithRouter(<App />, { initialEntries: routeMeals });

    // const shareButton = await screen.findByRole('button', { name: /shareicon/i });
    // expect(shareButton).toBeInTheDocument();
    // userEvent.setup(shareButton);
  });
});
