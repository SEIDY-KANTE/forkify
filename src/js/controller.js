import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';

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
    console.error(`Upps!! ${e.message} 🔥`);
  }
};

//Publisher-Sucriber Pattern Implementation
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
