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
  const [filterOn, setFilterOn] = useState(false);
  const [lastCategory, setLastCategory] = useState('');
  const [resultApiId, setResultApiId] = useState([]);

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

  const handleCategoryRequisition = useCallback((categoryName) => {
    if (categoryName === '/meals') {
      fetchCategoriesApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    } else {
      fetchCategoriesApi('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  }, [fetchCategoriesApi]);

  const renderRoute = useCallback(() => {
    if (!filterOn) {
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
    }
  }, [dados, history, filterOn]);

  const handleAllRecipes = useCallback((pathname) => {
    setFilterOn(false);
    if (pathname === '/meals') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [fetchApi]);

  const filterByCategory = useCallback((category, pathname) => {
    if (lastCategory !== category) {
      setFilterOn(true);
      setLastCategory(category);
      if (pathname === '/meals') {
        fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      } else {
        fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      }
    } else {
      setFilterOn(false);
      setLastCategory('');
      handleAllRecipes(pathname);
    }
  }, [fetchApi, handleAllRecipes, lastCategory]);

  useEffect(() => {
    if (!isFirstRender.current) renderRoute();
    else isFirstRender.current = false;
  }, [dados, renderRoute]);

  const values = useMemo(() => ({
    erro,
    dados,
    errors,
    recipes,
    categories,
    resultApiId,
    dataCategory,
    fetchId,
    fetchApi,
    setDados,
    setRecipes,
    renderRoute,
    setFilterOn,
    setCategories,
    setDataCategory,
    filterByCategory,
    handleAllRecipes,
    handleMealsRequisition,
    handleDrinksRequisition,
    handleCategoryRequisition,
  }), [
    erro,
    dados,
    errors,
    recipes,
    categories,
    resultApiId,
    dataCategory,
    fetchId,
    fetchApi,
    setDados,
    renderRoute,
    setDataCategory,
    filterByCategory,
    handleAllRecipes,
    handleMealsRequisition,
    handleDrinksRequisition,
    handleCategoryRequisition,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
