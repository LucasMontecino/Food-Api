import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("/recipes");

    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/recipes?name=" + name);
      return dispatch({
        type: "GET_RECIPES_NAME",
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
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}
