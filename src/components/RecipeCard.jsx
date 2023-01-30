import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, index, pathname, id }) {
  return (
    <li
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        to={ `${pathname}/${id}` }
      >
        <img
          src={ (recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb) }
          data-testid={ `${index}-card-img` }
          alt="meal"
          width="200px"
        />
        <p data-testid={ `${index}-card-name` }>
          {
            (recipe.strMeal ? recipe.strMeal : recipe.strDrink)
          }
        </p>
      </Link>
    </li>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
