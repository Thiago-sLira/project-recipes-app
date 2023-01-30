/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from './RecipeCard';

const NUMBER_TWELVE = 12;
function Recipes() {
  const { dados, recipes, setRecipes } = useContext(RecipesContext);

  const renderRecipes = () => {
    if (dados.meals && dados.meals.length > 1) {
      const slicedArray = dados.meals.slice(0, NUMBER_TWELVE);
      return setRecipes(slicedArray);
    } if (dados.drinks && dados.drinks.length > 1) {
      const slicedArray = dados.drinks.slice(0, NUMBER_TWELVE);
      return setRecipes(slicedArray);
    }
    setRecipes([]);
  };

  useEffect(() => {
    renderRecipes();
  }, [dados]);

  return (
    <div>
      { recipes.length > 0 && (
        recipes.map((recipe, index) => (
          <RecipeCard
            key={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
            recipe={ recipe }
            index={ index }
          />
        ))
      )}
    </div>
  );
}

Recipes.propTypes = {}.isRequired;

export default Recipes;
