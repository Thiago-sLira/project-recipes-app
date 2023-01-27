/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { dados, errors, fetchApi } = useFetch();
  const isFirstRender = useRef(true);

  const history = useHistory();

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
    console.log(dados);

    if (dados.meals === null || dados.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    const actualRoute = history.location.pathname.replace('/', '');
    if (dados.meals) {
      if (dados.meals.length === 1) {
        history.push(`/meals/${dados[actualRoute][0].idMeal}`);
      }
    } else if (dados.drinks && dados.drinks.length === 1) {
      history.push(`/drinks/${dados[actualRoute][0].idDrink}`);
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

  }), [dados, errors]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
