import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

import { async } from 'regenerator-runtime';

//console.log(icons);

const controlRecipes = async function () {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;
    recipeView.renderSpinner();

    //1. Loading Recipe
    await model.loadRecipe(hashId);

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    resultsView.render(model.getSearchResultsPage());

    //4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (e) {
    console.error(e);
  }
};

const controlPagination = function (goToPage) {
  //3) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

//Publisher-Sucriber Pattern Implementation
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearh(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
