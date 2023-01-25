import Button from 'react-bootstrap/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ mainPage, title }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
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
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </Button>

      { mainPage && (
        <Button
          type="button"
          data-testid="search-top-btn"
          className="profileButton"
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="profileIcon" />
        </Button>
      )}
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
