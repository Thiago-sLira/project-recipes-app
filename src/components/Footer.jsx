import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import RecipesContext from '../context/RecipesContext';

function Footer() {
  const { setDados } = useContext(RecipesContext);
  const history = useHistory();

  const handleDrinksClick = () => {
    history.push('/drinks');
    setDados([]);
  };

  const handleMealsClick = () => {
    history.push('/meals');
    setDados([]);
  };

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        name="drinks"
        id="drinks"
        onClick={ handleDrinksClick }
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Button>

      <Button
        type="button"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        name="meals"
        id="meals"
        onClick={ handleMealsClick }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
        />
      </Button>
    </footer>
  );
}

export default Footer;
