/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipesContext from '../../context/RecipesContext';

const NUMBER_TWELVE = 12;
function Meals() {
  const { dados } = useContext(RecipesContext);

  const [mealsRecipes, setMealsRecipes] = useState([]);

  const renderMealsRecipes = () => {
    if (dados.meals && dados.meals.length > 1) {
      const slicedArray = dados.meals.slice(0, NUMBER_TWELVE);
      setMealsRecipes(slicedArray);
    }
  };

  useEffect(() => {
    renderMealsRecipes();
  }, [dados]);

  return (
    <div>
      <Header mainPage title="Meals" />
      { mealsRecipes.length !== 0 && (
        mealsRecipes.map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt="meal"
              width="200px"
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>
        ))
      )}
      <Footer />
    </div>

  );
}

export default Meals;
