/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NUMBER_TWELVE = 12;
function Recipes() {
  const { dados, recipes, setRecipes } = useContext(RecipesContext);
  const history = useHistory();
  console.log();

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
      <Header
        mainPage
        title={ history.location.pathname.replace('/', '') === 'meals'
          ? 'meals'.replace('m', 'M') : 'drinks'.replace('d', 'D') }
      />
      { recipes.length > 0 && (
        recipes.map((recipe, index) => (
          <RecipeCard
            key={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
            recipe={ recipe }
            index={ index }
          />
        ))
      )}
      <Footer />
    </div>
  );
}

Recipes.propTypes = {}.isRequired;

export default Recipes;
