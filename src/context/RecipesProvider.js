import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { dados, errors, fetchApi, setDados } = useFetch();
  const isFirstRender = useRef(true);
  const [resultApiId, setResultApiId] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  const fetchId = useCallback((recipeId) => {
    const getFetchMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const getFetchDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    if (history.location.pathname.includes('meals')) {
      fetchApi(getFetchMeals);
    }
    if (history.location.pathname.includes('drinks')) {
      fetchApi(getFetchDrinks);
    }
  }, [fetchApi, history.location.pathname]);

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      setResultApiId(dados.meals ? dados.meals : []);
    } if (history.location.pathname.includes('drinks')) {
      setResultApiId(dados.drinks ? dados.drinks : []);
    }
  }, [dados, history.location.pathname]);

  const handleMealsRequisition = useCallback((searchField) => {
    const linkIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchField.searchInput}`;
    const linkName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField.searchInput}`;
    const linkFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchField.searchInput}`;

    if (searchField.radioValue === 'First-letter') {
      if (searchField.searchInput.length === 1) {
        fetchApi(linkFirstLetter);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    } if (searchField.radioValue === 'Name') {
      fetchApi(linkName);
    } else {
      fetchApi(linkIngredient);
    }
  }, [fetchApi]);

  const handleDrinksRequisition = useCallback((searchField) => {
    const linkIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchField.searchInput}`;
    const linkName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchField.searchInput}`;
    const linkFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchField.searchInput}`;

    if (searchField.radioValue === 'First-letter') {
      if (searchField.searchInput.length === 1) {
        fetchApi(linkFirstLetter);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    } if (searchField.radioValue === 'Name') {
      fetchApi(linkName);
    } else {
      fetchApi(linkIngredient);
    }
  }, [fetchApi]);

  const renderRoute = useCallback(() => {
    if (dados.meals === null || dados.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (dados.meals) {
      if (dados.meals.length === 1) {
        history.push(`/meals/${dados.meals[0].idMeal}`);
      }
    } else if (dados.drinks && dados.drinks.length === 1) {
      history.push(`/drinks/${dados.drinks[0].idDrink}`);
    }
  }, [dados.meals, dados.drinks, history]);

  useEffect(() => {
    if (!isFirstRender.current) renderRoute();
    else isFirstRender.current = false;
  }, [dados, renderRoute]);

  const values = useMemo(() => ({
    handleMealsRequisition,
    handleDrinksRequisition,
    errors,
    dados,
    renderRoute,
    recipes,
    setRecipes,
    setDados,
    fetchId,
    resultApiId,
  }), [
    dados,
    errors,
    recipes,
    resultApiId,
    setDados,
    fetchId,
    handleMealsRequisition,
    handleDrinksRequisition,
    renderRoute,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
