import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ mainPage, title }) {
  const [searchField, setSearchField] = useState({
    showField: false,
    searchInput: '',
    radioValue: '',
  });

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setSearchField({
      ...searchField,
      [name]: value,
    });
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    if (searchField.showField) {
      setSearchField({ ...searchField, showField: false });
    } else {
      setSearchField({ ...searchField, showField: true });
    }
  };

  return (
    <div>
      <h1 data-testid="page-title">
        {title }
      </h1>

      <Button
        type="button"
        data-testid="profile-top-btn"
        className="profileButton"
        src={ profileIcon }
        onClick={ handleProfileClick }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </Button>

      { mainPage && (
        <Button
          type="button"
          data-testid="search-top-btn"
          className="profileButton"
          src={ searchIcon }
          onClick={ handleSearchClick }
        >
          <img src={ searchIcon } alt="profileIcon" />
        </Button>
      )}
      { searchField.showField && (
        <section>
          <label htmlFor="input-search">
            <input
              data-testid="search-input"
              type="text"
              id="input-search"
              name="searchInput"
              value={ searchField.searchInput }
              onChange={ handleChange }
            />
          </label>
        </section>
      )}
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
