import React from 'react';
import { Link } from 'react-router-dom';

function RecomendationCard({ recipe, index, pathname, id, width }) {
  return (
    <div
      className="item"
      data-testid={ `${index}-recommendation-card` }
    >
      <Link
        to={ `${pathname}/${id}` }
        id="recomended-link"
      >
        <img
          src={ (recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb) }
          //   data-testid={ `${index}-card-img` }
          alt="meal"
          width={ width }
          className="recomendation-image"
        />
        <p data-testid={ `${index}-recommendation-title` } id="recomended-title">
          {
            (recipe.strMeal ? recipe.strMeal : recipe.strDrink)
          }
        </p>
      </Link>
    </div>
  );
}

RecomendationCard.propTypes = {}.isRequired;

export default RecomendationCard;
