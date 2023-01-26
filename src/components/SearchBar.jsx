import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
// import Button from 'react-bootstrap/Button';

function SearchBar() {
  const [searchField, setSearchField] = useState({
    searchInput: '',
    radioValue: '',
  });
  const {
    handleMealsRequisition, handleDrinksRequisition, dados,
  } = useContext(RecipesContext);

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setSearchField({
      ...searchField,
      [name]: value,
    });
  };

  const handleSearchClick = () => {
    if (history.location.pathname === '/meals') {
      handleMealsRequisition(searchField);
    } else {
      handleDrinksRequisition(searchField);
    }
  };

  useEffect(() => {
    const actualRoute = history.location.pathname.replace('/', '');
    if (dados[actualRoute] === 1) {
      history.push(`/${actualRoute}/:idDrink`);
    }
    console.log(dados);
  }, [dados]);

  return (

    <div>
      <section>
        <label htmlFor="input-search">
          <input
            data-testid="search-input"
            type="text"
            name="searchInput"
            id="input-search"
            value={ searchField.searchInput }
            onChange={ handleChange }
            placeholder="Digite aqui"
          />
        </label>
        <label htmlFor="radio-ingredient">
          Ingredient
          <input
            type="radio"
            name="radioValue"
            id="radio-ingredient"
            data-testid="ingredient-search-radio"
            value="Ingredient"
            onChange={ handleChange }
          />
          <label htmlFor="radio-name">
            Name
            <input
              type="radio"
              name="radioValue"
              id="radio-name"
              data-testid="name-search-radio"
              value="Name"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="radio-first-letter">
            First letter
            <input
              type="radio"
              name="radioValue"
              id="radio-first-letter"
              data-testid="first-letter-search-radio"
              value="First-letter"
              onChange={ handleChange }
            />
          </label>
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchClick }
        >
          Search
        </button>
      </section>
    </div>
  );
}

export default SearchBar;
