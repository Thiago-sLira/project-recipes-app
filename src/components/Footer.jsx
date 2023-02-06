// import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/icone-bebida.png';
import mealIcon from '../images/icone-prato.png';
import RecipesContext from '../context/RecipesContext';

function Footer() {
  const { setCategories } = useContext(RecipesContext);
  const history = useHistory();

  const handleDrinksClick = () => {
    history.push('/drinks');
    setCategories([]);
  };

  const handleMealsClick = () => {
    history.push('/meals');
    setCategories([]);
  };

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        name="drinks"
        id="drinks"
        className="footer-drinks"
        onClick={ handleDrinksClick }
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>

      <button
        type="button"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        name="meals"
        id="meals"
        className="footer-meals"
        onClick={ handleMealsClick }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </footer>
  );
}

export default Footer;
