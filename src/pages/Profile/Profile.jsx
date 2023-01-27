import React from 'react';
import { useHistory } from 'react-router-dom';
// import { getLocalStorageEmail } from '../../localStorage/localStorage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  // const getEmailLocalStorage = getLocalStorageEmail('user');

  const history = useHistory();

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header mainPage={ false } title="Profile" />
      <h1
        data-testid="profile-email"
      >
        {/* {getEmailLocalStorage.email ? getEmailLocalStorage.email : 'Logue com um email' } */}
      </h1>
      <section>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;
