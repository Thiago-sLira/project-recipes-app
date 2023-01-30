/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filter from '../components/Categories';

const NUMBER_TWELVE = 12;
function Recipes() {
  const {
    dados, recipes, setRecipes, handleAllRecipes,
  } = useContext(RecipesContext);
  const history = useHistory();

  const renderRecipes = () => {
    if (dados.meals && dados.meals.length > 0) {
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

  useEffect(() => {
    handleAllRecipes(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <div>
      <Header
        mainPage
        title={ history.location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <br />
      <Filter
        actualRoute={ history.location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <ul>
        { recipes.length > 0 && (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={ (recipe.idMeal ? recipe.idMeal : recipe.idDrink) }
              recipe={ recipe }
              index={ index }
            />
          ))
        )}
      </ul>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {}.isRequired;

export default Recipes;
