/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const { fetchId, resultApiId, dados } = useContext(RecipesContext);
  const [ingredientsValid, setIngredientsValid] = useState([]);

  useEffect(() => {
    fetchId();
    console.log(resultApiId);
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
  }, [dados]);

  return (
    <div>

      {resultApiId.length > 0 && (
        // <h1>{JSON.stringify(resultApiId[0].strMealThumb)}</h1>
        <div>
          <img
            src={ resultApiId[0].strMealThumb
              ? resultApiId[0].strMealThumb : resultApiId[0].strDrinkThumb }
            // src={ (resultApiId[0].strMealThumb) }
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
            { resultApiId[0].strCategory }
          </h2>
          {ingredientsValid && (
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
        </div>
      )}

    </div>
  );
}

export default RecipeDetails;
