export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_DIETS = "GET_DIETS";
export const FILTERED_BY_DIET = "FILTERED_BY_DIET";
export const ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER";
export const CREATED_FILTER = "CREATED_FILTER";
export const GET_RECIPES_START = "GET_RECIPES_START";

const initialState = {
  recipes: [],
  diets: [],
  filteredRecipes: [],
  isLoading: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
        isLoading: false,
      };

    case GET_RECIPES_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: action.payload,
        isLoading: false,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTERED_BY_DIET:
      return {
        ...state,
        recipes: action.payload,
      };
    case ALPHABETICAL_ORDER:
      let sortedRecipes =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => (a.name > b.name ? 1 : -1))
          : state.recipes.sort((a, b) => (a.name > b.name ? -1 : 1));
      return {
        ...state,
        recipes: sortedRecipes,
      };
    case CREATED_FILTER:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
