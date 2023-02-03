import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesOrigin, setFavoriteRecipesOrigin] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const storageRecipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageRecipesFavorite) {
      setFavoriteRecipes(storageRecipesFavorite);
      setFavoriteRecipesOrigin(storageRecipesFavorite);
    }
  }, []);

  useEffect(() => {
    setFavoriteRecipes(favoriteRecipesOrigin);
  }, [favoriteRecipesOrigin]);

  const filterByTypeButton = ({ target: { name } }) => {
    if (name === 'All') {
      setFavoriteRecipes(favoriteRecipesOrigin);
    } else {
      const filteredRecipes = favoriteRecipesOrigin.filter(({ type }) => type === name);
      setFavoriteRecipes(filteredRecipes);
    }
  };

  const shareButtonClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
  };

  const desfavoriteButtonClick = (id) => {
    const storageRecipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = storageRecipesFavorite.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
    setFavoriteRecipesOrigin(filteredRecipes);
  };

  return (
    <div>
      <Header mainPage={ false } title="Favorite Recipes" />
      <h4>{isCopied ? 'Link copied!' : ''}</h4>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ filterByTypeButton }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ filterByTypeButton }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ filterByTypeButton }
      >
        Drinks
      </button>
      <br />
      <ul>
        { favoriteRecipes.length > 0
        && (favoriteRecipes.map(({
          image, category, name, id, type, nationality, alcoholicOrNot,
        }, index) => (
          <li key={ index }>
            <Link
              to={ `${type}s/${id}` }
            >
              <img
                src={ image }
                alt="imageCardRecipe"
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
            </Link>
            { type === 'meal' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${nationality} - ${category}` }
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { alcoholicOrNot }
              </p>
            ) }
            <Link
              to={ `${type}s/${id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>
                { name }
              </p>
            </Link>
            <Button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              className="btn btn-danger"
              src={ shareIcon }
              onClick={ () => shareButtonClick(type, id) }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </Button>
            <Button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="btn btn-danger"
              src={ blackHeartIcon }
              onClick={ () => desfavoriteButtonClick(id) }
            >
              <img
                src={ blackHeartIcon }
                alt="favoriteIcon"
              />
            </Button>
          </li>
        ))) }
      </ul>
    </div>
  );
}

export default FavoriteRecipes;
