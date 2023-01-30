import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useCategoryFetch from '../hooks/useCategoryFetch';
import useFetch from '../hooks/useFetch';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const isFirstRender = useRef(true);
  const { dados, errors, fetchApi, setDados } = useFetch();
  const [recipes, setRecipes] = useState([]);
  const { dataCategory, erro, fetchCategoriesApi, setDataCategory } = useCategoryFetch();
  const [categories, setCategories] = useState([]);

  const history = useHistory();

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

  const handleCategoryClick = useCallback((categoryName) => {
    if (categoryName === 'Meals') {
      fetchCategoriesApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    } else {
      fetchCategoriesApi('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  }, [fetchCategoriesApi]);

  const renderRoute = useCallback(() => {
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
  }, [dados, history]);

  useEffect(() => {
    if (!isFirstRender.current) renderRoute();
    else isFirstRender.current = false;
  }, [dados, renderRoute]);

  const values = useMemo(() => ({
    handleMealsRequisition,
    handleDrinksRequisition,
    handleCategoryClick,
    errors,
    dados,
    renderRoute,
    recipes,
    setRecipes,
    setDados,
    erro,
    dataCategory,
    setDataCategory,
    categories,
    setCategories,
    fetchApi,
  }), [
    erro,
    dados,
    errors,
    recipes,
    categories,
    dataCategory,
    fetchApi,
    setDados,
    renderRoute,
    setDataCategory,
    handleCategoryClick,
    handleDrinksRequisition,
    handleMealsRequisition,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
