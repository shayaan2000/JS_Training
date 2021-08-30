import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

// import icons from '../img/icons.svg' // parcel 1
import icons from "url:../img/icons.svg"; // parcel 2

// for transpiling and polyfilling
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import paginationView from "./views/paginationView.js";
import { MODAL_CLOSE_TIME } from "./config.js";

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////
// Subscriber in the Publisher-Subscriber
const controlRecipe = async function () {
  try {
    // Getting ID from url
    const id = window.location.hash.slice(1);

    // guard clause - runs with load event callback
    if (!id) return;

    // 0. Render Spinner
    recipeView.renderSpinner();

    // 0.5 update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // showing spinner
    resultsView.renderSpinner();

    // 1) Get search Query
    const query = searchView.getQuery();

    // guard clause
    if (!query) return;

    // 2) Load search Results
    await model.loadSearchResults(query);

    // 3) Render Results
    resultsView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage)); //changes state of page number

  // 4) Render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings = 1) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe); //not good as it updates the who recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);

  try {
    // showing spinner
    addRecipeView.renderSpinner();

    //function to upload recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //showing on page
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //closing form
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_TIME * 1000);
  } catch (error) {
    addRecipeView.renderError("Wrong format of ingredients");
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  // setting up Subscriber in Publisher-Subscriber pattern
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
