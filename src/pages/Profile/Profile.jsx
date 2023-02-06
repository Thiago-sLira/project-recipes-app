import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalStorageEmail } from '../../localStorage/localStorage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const [localStorageEmail, setLocalStorageEmail] = useState({ email: '' });

  useEffect(() => {
    setLocalStorageEmail(!getLocalStorageEmail('user')
      ? { email: 'Logue com um email' } : getLocalStorageEmail('user'));
  }, []);

  const history = useHistory();

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-div">
      <Header mainPage={ false } title="Profile" />
      <h2 data-testid="profile-email">
        { localStorageEmail.email }
      </h2>
      <section>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="profile-buttons"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="profile-buttons"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
          className="profile-buttons"
        >
          Logout
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;
