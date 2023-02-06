import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);
  const [recipesDoneOrigin, setRecipesDoneOrigin] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const storageRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storageRecipesDone) {
      setRecipesDone(storageRecipesDone);
      setRecipesDoneOrigin(storageRecipesDone);
    }
  }, []);

  const filterByTypeButton = ({ target: { name } }) => {
    if (name === 'All') {
      setRecipesDone(recipesDoneOrigin);
    } else {
      const filteredRecipes = recipesDoneOrigin.filter(({ type }) => type === name);
      setRecipesDone(filteredRecipes);
    }
  };

  const shareButtonClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
  };

  return (
    <div className="doneRecipes-div">
      <Header mainPage={ false } title="Done Recipes" />
      <h3>{isCopied ? 'Link copied!' : ''}</h3>
      <div className="div-buttons-doneRecipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ filterByTypeButton }
          className="doneRecipesButton"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          name="meal"
          onClick={ filterByTypeButton }
          className="doneRecipesButton"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ filterByTypeButton }
          className="doneRecipesButton"
        >
          Drinks
        </button>
      </div>
      <br />
      <ul>
        { recipesDone.length > 0
        && (recipesDone.map(({
          image, category, name, nationality, tags, doneDate, type, id, alcoholicOrNot,
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
            )}
            <Link
              to={ `${type}s/${id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>
                { name }
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { doneDate }
            </p>
            { tags.slice(0, 2).map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                { tag }
              </p>
            )) }
            <Button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              className="btn btn-danger"
              src={ shareIcon }
              onClick={ () => shareButtonClick(type, id) }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </Button>
            <br />
          </li>
        ))) }
      </ul>
    </div>
  );
}

export default DoneRecipes;
