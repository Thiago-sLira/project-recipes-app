import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import DoneRecipes from '../pages/DoneRecipes/DoneRecipes';
// import DrinksDetails from '../pages/DrinksDetails/DrinksDetails';
import DrinksInProgress from '../pages/DrinksInProgress/DrinksInProgress';
import FavoriteRecipes from '../pages/FavoriteRecipes/FavoriteRecipes';
import Login from '../pages/Login/Login';
// import MealsDetails from '../pages/MealsDetails/MealsDetails';
import MealsInProgress from '../pages/MealsInProgress/MealsInProgress';
import Profile from '../pages/Profile/Profile';
import Recipes from '../pages/Recipes';

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
        component={ Recipes }
      />
      <Route
        exact
        path="/meals/:id"
        component={ RecipeDetails }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ MealsInProgress }
      />
      <Route
        exact
        path="/drinks"
        component={ Recipes }
      />
      <Route
        exact
        path="/drinks/:id"
        component={ RecipeDetails }
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
