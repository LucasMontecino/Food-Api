import {
  ALPHABETICAL_ORDER,
  CREATED_FILTER,
  FILTERED_BY_DIET,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_NAME,
  GET_RECIPES_NAME_ERROR,
  GET_RECIPES_START,
  GET_RECIPE_DETAIL,
} from '../reducer';

import recipeService from '../services/recipeService';
import dietService from '../services/dietService';

export function getRecipes() {
  return async function (dispatch) {
    dispatch(getRecipesStart());
    try {
      const res = await recipeService.getAll();

      return dispatch({
        type: GET_RECIPES,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    dispatch(getRecipesStart());
    try {
      const res = await recipeService.getByName(name);
      if (res) {
        return dispatch({
          type: GET_RECIPES_NAME,
          payload: res,
        });
      } else {
        return dispatch({
          type: GET_RECIPES_NAME_ERROR,
          payload: 'No se encontraron recetas con ese nombre.',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return dispatch({
          type: GET_RECIPES_NAME_ERROR,
          payload: 'No se encontraron recetas con ese nombre.',
        });
      } else {
        console.log(error);
      }
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    const res = await dietService.getAll();
    return dispatch({
      type: GET_DIETS,
      payload: res,
    });
  };
}

export function filteredByDiet(diet) {
  return async function (dispatch) {
    dispatch(getRecipesStart());
    try {
      const res = await recipeService.getByDiet(diet);
      return dispatch({
        type: FILTERED_BY_DIET,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function alphabeticalOrder(payload) {
  return {
    type: ALPHABETICAL_ORDER,
    payload,
  };
}

export function createdFilter(payload) {
  return async function (dispatch) {
    try {
      const res = await recipeService.getByCreatedFilter(payload);
      return dispatch({
        type: CREATED_FILTER,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    dispatch(getRecipesStart());
    try {
      if (id) {
        const res = await recipeService.getDetail(id);
        return dispatch({
          type: GET_RECIPE_DETAIL,
          payload: res,
        });
      } else {
        return dispatch({
          type: GET_RECIPE_DETAIL,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesStart() {
  return {
    type: GET_RECIPES_START,
  };
}

export function postRecipe(payload) {
  return async function () {
    const res = await recipeService.create(payload);
    return res;
  };
}
