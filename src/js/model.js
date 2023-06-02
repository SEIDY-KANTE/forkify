import { async } from 'regenerator-runtime';
import { API_URL, KEY, RESULT_PER_PAGE } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: [],
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return (state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    ...(recipe.key && { key: recipe.key }),
  });
};

export const loadRecipe = async function (hashId) {
  try {
    const data = await AJAX(`${API_URL}/${hashId}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    // console.log(state.recipe);

    if (state.bookmarks.some(bookmark => bookmark.id === hashId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (e) {
    throw e;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}/?search=${query}&key=${KEY}`);
    //console.log(data);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    //console.log(state.search.results);
    //Reset page to 1
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    //newQt=oldQt*newServings/oldServings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persitBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persitBookmarks();
};

export const deleteBookmark = function (id) {
  //Find bookmarked index
  const index = state.bookmarks.findIndex(el => el.id === id);

  //Delete bookmarked
  state.bookmarks.splice(index, 1);

  //Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

//clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format:)'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    //console.log(ingredients);
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    //console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    //console.log(data);
    state.recipe = createRecipeObject(data);
    //console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (e) {
    throw e;
  }
};
