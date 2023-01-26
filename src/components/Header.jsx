import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
      { showSearchField && (
        <SearchBar />
      )}
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
