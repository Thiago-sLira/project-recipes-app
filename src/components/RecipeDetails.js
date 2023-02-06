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
  const { fetchId, resultApiId, ingredientsValidArray } = useContext(RecipesContext);
  const { fetchRecomendationApi, dataRecomendation } = useRecomendationFetch();
  const [ingredientsValid, setIngredientsValid] = useState([]);
  const [isCopied, setIsCopied] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [recipeDone, setRecipeDone] = useState(false); // lembrar de mudar para false
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [recomendations, setRecomendations] = useState([]);
  const params = useParams();
  const history = useHistory();
  const actualPath = history.location.pathname;

  const getDoneRecipes = useCallback(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!localDoneRecipes) {
      setRecipeDone(true);
    } else {
      setRecipeDone(!localDoneRecipes.some((r) => r.id.includes(params.id)));
    }
  }, [resultApiId.id]);

  const getInProgressRecipe = () => {
    const localInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const key = history.location.pathname.split('/')[1];
    if (localInProgressRecipes && localInProgressRecipes[key]) {
      if (localInProgressRecipes[key][params.id]) {
        setRecipeInProgress(true);
      } else {
        setRecipeInProgress(false);
      }
    } else {
      setRecipeInProgress(false);
    }
  };

  const handleButton = () => {
    history.push(`${actualPath}/in-progress`);
  };
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
    getInProgressRecipe();
    fetchId(params.id);
    const returnLocalStorage = getLocalStorageFavorite('favoriteRecipes');
    const findLocalStorage = returnLocalStorage.find((recipe) => recipe.id === params.id);
    if (findLocalStorage) {
      setIsClicked(true);
    }
  }, [history.location.pathname, fetchId, getDoneRecipes, params.id]);

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
    <div className="recipeDetails-div">
      {resultApiId.length > 0 && (
        <div>
          <figure className="header-details">
            <img
              src={ resultApiId[0].strMealThumb
                ? resultApiId[0].strMealThumb : resultApiId[0].strDrinkThumb }
              data-testid="recipe-photo"
              alt="meal"
              // width="200px"
              id="img-details"
            />
            <figcaption data-testid="recipe-title" id="title-details">
              {
                (resultApiId[0].strMeal ? resultApiId[0].strMeal
                  : resultApiId[0].strDrink)
              }
            </figcaption>
            <figcaption data-testid="recipe-category" id="category-details">
              { resultApiId[0].strCategory}
            </figcaption>
            <h3 data-testid="recipe-category" id="isAlcoholic-details">
              { resultApiId[0].strAlcoholic }
            </h3>
            <Button
              type="button"
              data-testid="share-btn"
              className="btn btn-danger"
              id="share-button"
              src={ shareIcon }
              onClick={ shareButtonClick }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </Button>
            <h2 className="isCopied">{isCopied}</h2>
            <Button
              type="button"
              data-testid="favorite-btn"
              className="btn btn-danger"
              id="favorite-button"
              src={ isClicked ? blackHeartIcon : whiteHeartIcon }
              onClick={ favoriteButtonClick }
            >
              <img
                src={ isClicked ? blackHeartIcon : whiteHeartIcon }
                alt="favoriteIcon"
              />
            </Button>
          </figure>
          <h1 id="ingredients-name">Ingredients</h1>
          <div className="recipeDetails-ingredients">
            {ingredientsValid.length > 0 && (
              ingredientsValid.map((ingredient, index) => (
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                  className="recipesDetailsIngredients-p"
                >
                  { `${ingredient.ingredient} 
                ${ingredient.measure}` }
                </p>
              ))
            )}
          </div>
          <h1 id="instructions-name">Instructions</h1>
          <p data-testid="instructions" id="RecipeDetails-instructions">
            {resultApiId[0].strInstructions}
          </p>
          {recipeDone && (
            <Button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ handleButton }
            >
              {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </Button>
          )}
          {resultApiId[0].strMeal && (
            <iframe
              width="500"
              height="350"
              data-testid="video"
              src={ resultApiId[0].strYoutube
                && resultApiId[0].strYoutube.replace('watch?v=', 'embed/') }
              allow="autoplay"
              title="Receita"
              id="recipeDetails-video"
            />
          )}
        </div>
      )}
      <section>
        <h2 id="instructions-name">Recomendations</h2>
        { recomendations.length > 0 && (
          <div className="container">
            {
              recomendations.map((recipe, index) => (
                <RecomendationCard
                  key={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
                  recipe={ recipe }
                  index={ index }
                  pathname={ history.location.pathname.includes('meals')
                    ? '/drinks' : '/meals' }
                  id={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
                  width="150px"
                  className="recomended-recipe"
                />
              ))
            }
          </div>
        )}
      </section>
    </div>
  );
}

export default RecipeDetails;
