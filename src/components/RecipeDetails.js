/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setLocalStorage, getLocalStorageFavorite } from '../localStorage/localStorage';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { fetchId, resultApiId, dados } = useContext(RecipesContext);
  const [ingredientsValid, setIngredientsValid] = useState([]);
  const [isCopied, setIsCopied] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
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
      measure: measure[index][1],
    }));
  };

  useEffect(() => {
    if (resultApiId.length > 0) {
      setIngredientsValid(ingredientsValidArray());
      ingredientsValidArray();
    }
  }, [dados, resultApiId]);

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

        </div>
      )}

    </div>
  );
}

export default RecipeDetails;
