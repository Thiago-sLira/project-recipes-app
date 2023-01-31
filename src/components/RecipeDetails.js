/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setLocalStorage, getLocalStorageFavorite } from '../localStorage/localStorage';
import useRecomendationFetch from '../hooks/useRecomendationFetch';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { fetchId, resultApiId } = useContext(RecipesContext);
  const { fetchRecomendationApi } = useRecomendationFetch();
  const [ingredientsValid, setIngredientsValid] = useState([]);
  const [isCopied, setIsCopied] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [recipeDone, setRecipeDone] = useState(false);
  const params = useParams();
  const history = useHistory();

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
  const getDoneRecipes = () => {
    // const recipesDoneStorage = getLocalStorageDoneRecipes(doneRecipes);
    const recipesDoneStorage = mockDoneRecipes;
    if (recipesDoneStorage.some((r) => r.id.includes(resultApiId.id))) {
      setRecipeDone(true);
    }
  };

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
  }, []);

  const getValidIngredients = (str) => Object.entries(resultApiId[0])
    .filter((entry) => entry[0].includes(str))
    .filter((entry) => entry[1]);

  const ingredientsValidArray = () => {
    const measure = getValidIngredients('strMeasure');
    const ingredient = getValidIngredients('strIngredient');

    return ingredient.map((data, index) => ({
      ingredient: data[1],
      measure: (measure[index] ? measure[index][1] : ''),
    }));
  };

  useEffect(() => {
    if (resultApiId.length > 0) {
      setIngredientsValid(ingredientsValidArray());
      ingredientsValidArray();
    }
  }, [resultApiId]);

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

    </div>
  );
}

export default RecipeDetails;
