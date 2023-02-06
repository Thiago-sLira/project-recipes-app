import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, index, pathname, id, width }) {
  return (
    <div className="recipeCard">
      <li
        data-testid={ `${index}-recipe-card` }
        id="li-recipeCard"
      >
        <Link
          to={ `${pathname}/${id}` }
          id="link-name"
        >
          <img
            src={ (recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb) }
            data-testid={ `${index}-card-img` }
            alt="meal"
            width={ width }
          />
          <p data-testid={ `${index}-card-name` } id="recipe-name">
            {
              (recipe.strMeal ? recipe.strMeal : recipe.strDrink)
            }
          </p>
        </Link>
      </li>
    </div>

  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
