import Button from 'react-bootstrap/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleDrinksClick = () => {
    history.push('/drinks');
  };

  const handleMealsClick = () => {
    history.push('/meals');
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
