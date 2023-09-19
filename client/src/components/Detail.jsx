import React, { useEffect } from "react";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../actions";
import Loading from "./Loading";

const Detail = (props) => {
  const recipeId = props.match.params.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipeDetail(recipeId));
    return () => {
      dispatch(getRecipeDetail(""));
    };
  }, [dispatch, recipeId]);

  const recipeDetail = useSelector((state) => state.recipeDetail);
  const isLoading = useSelector((state) => state.isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {recipeDetail && (
        <div className={style.recipe_detail}>
          <img src={recipeDetail.image} alt={recipeDetail.name} />
          <div className={style.recipe_info}>
            <h2 className={style.recipe_name}>{recipeDetail.name}</h2>
            <p className={style.recipe_summary}>{recipeDetail.summary}</p>
            <div className={style.diet_types}>
              <p className={style.diet_label}>Diets:</p>
              <ul className={style.diet_list}>
                {recipeDetail.diets && recipeDetail.diets[0].name
                  ? recipeDetail.diets.map((diet) => (
                      <li key={diet.name} className={style.diet_item}>
                        {diet.name}
                      </li>
                    ))
                  : recipeDetail.diets &&
                    recipeDetail.diets.map((diet) => (
                      <li key={diet} className={style.diet_item}>
                        {diet}
                      </li>
                    ))}
              </ul>
            </div>
            <p className={style.healthScore}>
              Health Score: {recipeDetail.healthScore}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
