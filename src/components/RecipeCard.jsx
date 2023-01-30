import React from 'react';

function RecipeCard({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
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
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
