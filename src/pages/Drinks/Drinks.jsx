/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipesContext from '../../context/RecipesContext';

const NUMBER_TWELVE = 12;
function Drinks() {
  const { dados } = useContext(RecipesContext);
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  const renderDrinksRecipes = () => {
    if (dados.drinks && dados.drinks.length > 1) {
      const slicedArray = dados.drinks.slice(0, NUMBER_TWELVE);
      setDrinksRecipes(slicedArray);
    }
  };

  useEffect(() => {
    renderDrinksRecipes();
  }, [dados]);
  return (
    <div>
      <Header mainPage title="Drinks" />

      { drinksRecipes.length !== 0 && (
        drinksRecipes.map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt="drink"
              width="200px"
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))
      )}

      <Footer />
    </div>
  );
}

export default Drinks;
