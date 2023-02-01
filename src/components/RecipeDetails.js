/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useRecomendationFetch from '../hooks/useRecomendationFetch';
import { setLocalStorage, getLocalStorageFavorite } from '../localStorage/localStorage';
import RecomendationCard from './RecomendationCard';

const copy = require('clipboard-copy');

const SIX = 6;
function RecipeDetails() {
  const { fetchId, resultApiId } = useContext(RecipesContext);
  const { fetchRecomendationApi, dataRecomendation } = useRecomendationFetch();
  const [ingredientsValid, setIngredientsValid] = useState([]);
  const [isCopied, setIsCopied] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [recipeDone, setRecipeDone] = useState(false);
  const [recomendations, setRecomendations] = useState([]);
  const params = useParams();
  const history = useHistory();

  const getDoneRecipes = useCallback(() => {
    const mockDoneRecipes = [{
      id: 'id-da-receita',
      type: 'meal-ou-drink',
      nationality: 'nacionalidade-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: 'array-de-tags-da-receita-ou-array-vazio',
    }];
    // const recipesDoneStorage = getLocalStorageDoneRecipes(doneRecipes);
    const recipesDoneStorage = mockDoneRecipes;
    if (recipesDoneStorage.some((r) => r.id.includes(resultApiId.id))) {
      setRecipeDone(true);
    }
  }, [resultApiId.id]);

  useEffect(() => {
    const route = dataRecomendation.meals || dataRecomendation.drinks;
    if (route) {
      const slicedArray = route.slice(0, SIX);
      setRecomendations(slicedArray || []);
    }
  }, [dataRecomendation]);

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      fetchRecomendationApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchRecomendationApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [history.location.pathname]);

  useEffect(() => {
    getDoneRecipes();
    fetchId(params.id);
    const returnLocalStorage = getLocalStorageFavorite('favoriteRecipes');
    const findLocalStorage = returnLocalStorage.find((recipe) => recipe.id === params.id);
    if (findLocalStorage) {
      setIsClicked(true);
    }
  }, [history.location.pathname, fetchId, getDoneRecipes, params.id]);

  const getValidIngredients = useCallback((str) => Object.entries(resultApiId[0])
    .filter((entry) => entry[0].includes(str))
    .filter((entry) => entry[1]), [resultApiId]);

  const ingredientsValidArray = useCallback(() => {
    const measure = getValidIngredients('strMeasure');
    const ingredient = getValidIngredients('strIngredient');

    return ingredient.map((data, index) => ({
      ingredient: data[1],
      measure: (measure[index] ? measure[index][1] : ''),
    }));
  }, [getValidIngredients]);

  useEffect(() => {
    if (resultApiId.length > 0) {
      setIngredientsValid(ingredientsValidArray());
      ingredientsValidArray();
    }
  }, [resultApiId, ingredientsValidArray]);

  const shareButtonClick = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied('Link copied!');
  };

  const favoriteButtonClick = () => {
    const objectFavoriteRecipes = {
      id: (resultApiId[0].idMeal ? resultApiId[0].idMeal : resultApiId[0].idDrink),
      type: (history.location.pathname.includes('meals') ? 'meal' : 'drink'),
      nationality: (resultApiId[0].strArea ? resultApiId[0].strArea : ''),
      category: (resultApiId[0].strCategory ? resultApiId[0].strCategory : ''),
      alcoholicOrNot: (resultApiId[0].strAlcoholic ? resultApiId[0].strAlcoholic : ''),
      name: (resultApiId[0].strMeal ? resultApiId[0].strMeal : resultApiId[0].strDrink),
      image: (resultApiId[0].strMealThumb
        ? resultApiId[0].strMealThumb : resultApiId[0].strDrinkThumb),
    };
    setLocalStorage('favoriteRecipes', objectFavoriteRecipes);
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
      const parseLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const filterLocalStorage = parseLocalStorage
        .filter((recipe) => recipe.id !== params.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }
  };

  return (
    <div>
      {resultApiId.length > 0 && (
        <div>
          <img
            src={ resultApiId[0].strMealThumb
              ? resultApiId[0].strMealThumb : resultApiId[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt="meal"
            width="200px"
          />
          <h1 data-testid="recipe-title">
            {
              (resultApiId[0].strMeal ? resultApiId[0].strMeal : resultApiId[0].strDrink)
            }
          </h1>
          <h2 data-testid="recipe-category">
            { resultApiId[0].strCategory}
          </h2>
          <h2 data-testid="recipe-category">
            { resultApiId[0].strAlcoholic }
          </h2>
          <Button
            type="button"
            data-testid="share-btn"
            className="btn btn-danger"
            src={ shareIcon }
            onClick={ shareButtonClick }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </Button>
          <h1>{isCopied}</h1>
          <Button
            type="button"
            data-testid="favorite-btn"
            className="btn btn-danger"
            src={ isClicked ? blackHeartIcon : whiteHeartIcon }
            onClick={ favoriteButtonClick }
          >
            <img
              src={ isClicked ? blackHeartIcon : whiteHeartIcon }
              alt="favoriteIcon"
            />
          </Button>
          {ingredientsValid.length > 0 && (
            ingredientsValid.map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                { `${ingredient.ingredient} 
                ${ingredient.measure}` }
              </p>
            ))
          )}
          <p data-testid="instructions">
            {resultApiId[0].strInstructions}
          </p>
          <iframe
            width="500"
            height="350"
            data-testid="video"
            src={ resultApiId[0].strYoutube
               && resultApiId[0].strYoutube.replace('watch?v=', 'embed/') }
            allow="autoplay"
            title="Receita"
          />
          {recipeDone && (
            <Button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              // onClick={ getDoneRecipes }
            >
              Start Recipe
            </Button>
          )}
        </div>
      )}
      <section>
        <h2>Recomendations</h2>
        { recomendations.length > 0 && (
          recomendations.map((recipe, index) => (
            <RecomendationCard
              key={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
              recipe={ recipe }
              index={ index }
              pathname={ history.location.pathname.includes('meals')
                ? '/drinks' : '/meals' }
              id={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
              width="150px"
            />
          ))
        )}
      </section>
    </div>
  );
}

export default RecipeDetails;
