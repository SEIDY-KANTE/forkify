import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (hashId) {
  const resp = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${hashId}`
  );
  if (!resp.ok) throw new Error(`${res.status}`);
  //console.log(resp);
  const data = await resp.json();
  //console.log(data);
  const { recipe } = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
  };

  console.log(state.recipe);
};
