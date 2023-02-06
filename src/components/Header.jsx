// import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/icone-perfil.png';
import searchIcon from '../images/Vector.png';
import SearchBar from './SearchBar';
import logo from '../images/header-logo.png';

function Header({ mainPage, title }) {
  const [showSearchField, setShowSearchField] = useState(false);

  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    if (showSearchField) {
      setShowSearchField(false);
    } else {
      setShowSearchField(true);
    }
  };

  return (
    <div>
      <header className="header-bar">
        <img src={ logo } alt="" className="logo-header" />
        <p id="p-header">Recipes app</p>
        <button
          type="button"
          data-testid="profile-top-btn"
          className="profileButton"
          src={ profileIcon }
          onClick={ handleProfileClick }
        >
          <img src={ profileIcon } alt="profileIcon" />
        </button>
        { mainPage && (
          <button
            type="button"
            data-testid="search-top-btn"
            className="searchButton"
            src={ searchIcon }
            onClick={ handleSearchClick }
          >
            <img src={ searchIcon } alt="profileIcon" />
          </button>
        )}
      </header>
      <h1 data-testid="page-title" id="header-title">
        {title }
      </h1>
      { showSearchField && (
        <SearchBar />
      )}
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
