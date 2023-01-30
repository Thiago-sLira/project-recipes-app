/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import CategoryCard from '../components/CategoryCard';

const NUMBER_TWELVE = 12;
const NUMBER_FIVE = 5;
function Recipes() {
  const {
    dados, recipes, setRecipes,
    dataCategory, categories, setCategories,
  } = useContext(RecipesContext);
  const history = useHistory();

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

  const rederCategories = () => {
    if (dataCategory.meals) {
      const slicedArray = dataCategory.meals.slice(0, NUMBER_FIVE);
      console.log('entrou');
      return setCategories(slicedArray);
    } if (dataCategory.drinks) {
      const slicedArray = dataCategory.drinks.slice(0, NUMBER_FIVE);
      return setCategories(slicedArray);
    }
  };

  useEffect(() => {
    rederCategories();
  }, [dataCategory]);

  return (
    <div>
      <Header
        mainPage
        title={ history.location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <br />
      <Filter
        categoryName={ history.location.pathname === '/meals' ? 'Meals' : 'Drinks' }
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
      <ul>
        { categories.length > 0 && (
          categories.map(({ strCategory }) => (
            <CategoryCard
              key={ strCategory }
              strCategory={ strCategory }
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
