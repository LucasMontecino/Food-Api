import axios from "axios";
import {
  ALPHABETICAL_ORDER,
  CREATED_FILTER,
  FILTERED_BY_DIET,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_NAME,
} from "../reducer";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("/recipes");

    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/recipes?name=" + name);
      return dispatch({
        type: GET_RECIPES_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get("/diets");

    return dispatch({
      type: GET_DIETS,
      payload: json.data,
    });
  };
}

export function filteredByDiet(diet) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/recipes?diet=${diet}`);
      return dispatch({
        type: FILTERED_BY_DIET,
        payload: json.data,
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
      let json = await axios.get(`/recipes?created=${payload}`);
      return dispatch({
        type: CREATED_FILTER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
