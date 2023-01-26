import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes/DoneRecipes';
import Drinks from '../pages/Drinks/Drinks';
import DrinksDetails from '../pages/DrinksDetails/DrinksDetails';
import DrinksInProgress from '../pages/DrinksInProgress/DrinksInProgress';
import FavoriteRecipes from '../pages/FavoriteRecipes/FavoriteRecipes';
import Login from '../pages/Login/Login';
import Meals from '../pages/Meals/Meals';
import MealsDetails from '../pages/MealsDetails/MealsDetails';
import MealsInProgress from '../pages/MealsInProgress/MealsInProgress';
import Profile from '../pages/Profile/Profile';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/meals"
        component={ Meals }
      />
      <Route
        exact
        path="/meals/:id"
        component={ MealsDetails }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ MealsInProgress }
      />
      <Route
        exact
        path="/drinks"
        component={ Drinks }
      />
      <Route
        exact
        path="/drinks/:id-da-receita"
        component={ DrinksDetails }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ DrinksInProgress }
      />
      <Route
        exact
        path="/favorite-recipes"
        component={ FavoriteRecipes }
      />
      <Route
        exact
        path="/done-recipes"
        component={ DoneRecipes }
      />
      <Route
        exact
        path="/profile"
        component={ Profile }
      />
    </Switch>
  );
}

export default Routes;
