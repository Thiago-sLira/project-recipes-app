import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipesContext from './RecipesContext';

const NUMBER_7 = 7;
const NUMBER_8 = 8;

function RecipesProvider({ children }) {
  const { dados, errors, fetchApi, setDados } = useFetch();
  const isFirstRender = useRef(true);
  const [resultApiId, setResultApiId] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  const fetchId = useCallback(async () => {
    const locationPath = history.location.pathname;
    const locationSliceMeals = locationPath.slice(NUMBER_7);
    const locationSliceDrinks = locationPath.slice(NUMBER_8);

    const getFetchMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${locationSliceMeals}`;
    const getFetchDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${locationSliceDrinks}`;
    if (dados && locationPath.includes('meals')) {
      await fetchApi(getFetchMeals);
      setResultApiId(dados.meals ? dados.meals : []);
      console.log('entrou');
    }
    if (dados && locationPath.includes('drinks')) {
      await fetchApi(getFetchDrinks);
      setResultApiId(dados.drinks ? dados.drinks : []);
    }
  }, [dados, fetchApi, history.location.pathname]);

  const handleMealsRequisition = (searchField) => {
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
  };

  const handleDrinksRequisition = (searchField) => {
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
  };

  const renderRoute = () => {
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
  };

  useEffect(() => {
    if (!isFirstRender.current) renderRoute();
    else isFirstRender.current = false;
  }, [dados]);

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
  }), [dados, errors, recipes, resultApiId, setDados, fetchId]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
