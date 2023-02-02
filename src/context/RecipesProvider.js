import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useCategoryFetch from '../hooks/useCategoryFetch';
import useFetch from '../hooks/useFetch';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const isFirstRender = useRef(true);
  const { dados, errors, fetchApi, setDados } = useFetch();
  const { dataCategory, erro, fetchCategoriesApi, setDataCategory } = useCategoryFetch();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [lastCategory, setLastCategory] = useState('');
  const [resultApiId, setResultApiId] = useState([]);

  const history = useHistory();

  const fetchId = useCallback(async (recipeId) => {
    const getFetchMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const getFetchDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    if (history.location.pathname.includes('meals')) {
      try {
        const data = await fetch(getFetchMeals);
        const json = await data.json();
        setResultApiId(json.meals || []);
      } catch (error) {
        console.log(error);
      }
    }
    if (history.location.pathname.includes('drinks')) {
      try {
        const data = await fetch(getFetchDrinks);
        const json = await data.json();
        setResultApiId(json.drinks || []);
      } catch (error) {
        console.log(error);
      }
    }
  }, [history.location.pathname]);

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
    if (pathname.includes('/meals')) {
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

  const ingredientsValidArray = useCallback(() => {
    const getValidIngredients = (str) => Object.entries(resultApiId[0])
      .filter((entry) => entry[0].includes(str))
      .filter((entry) => entry[1]);
    const measure = getValidIngredients('strMeasure');
    const ingredient = getValidIngredients('strIngredient');

    return ingredient.map((data, index) => ({
      ingredient: data[1],
      measure: (measure[index] ? measure[index][1] : ''),
    }));
  }, [resultApiId]);

  useEffect(() => {
    if (!isFirstRender.current) renderRoute();
    else isFirstRender.current = false;
  }, [dados, renderRoute]);

  const handleFinishRecipeClick = useCallback(() => {
    const doneLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    // const dateCool = new Date().toUTCString();
    // const dateUsed = new Date().toLocaleDateString();
    const dateUsed = new Date().toISOString();
    const doneRecipe = {
      id: (resultApiId[0].idMeal ? resultApiId[0].idMeal : resultApiId[0].idDrink),
      type: (history.location.pathname.includes('meals') ? 'meal' : 'drink'),
      nationality: (resultApiId[0].strArea ? resultApiId[0].strArea : ''),
      category: (resultApiId[0].strCategory ? resultApiId[0].strCategory : ''),
      alcoholicOrNot: (resultApiId[0].strAlcoholic ? resultApiId[0].strAlcoholic : ''),
      name: (resultApiId[0].strMeal ? resultApiId[0].strMeal : resultApiId[0].strDrink),
      image: (resultApiId[0].strMealThumb
        ? resultApiId[0].strMealThumb : resultApiId[0].strDrinkThumb),
      doneDate: dateUsed,
      tags: resultApiId[0].strTags ? resultApiId[0].strTags.split(',') : [],
    };
    if (doneLocalStorage) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneLocalStorage, doneRecipe]),
      );
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    }
    history.push('/done-recipes');
  }, [resultApiId, history]);

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
    ingredientsValidArray,
    handleMealsRequisition,
    handleDrinksRequisition,
    handleFinishRecipeClick,
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
    ingredientsValidArray,
    handleMealsRequisition,
    handleFinishRecipeClick,
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
