import React, { useEffect } from "react";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../actions";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";

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
      <div className={style.button_container}>
        <Link to={`/home`}>
          <CustomButton text={"Return to Home"} />
        </Link>
      </div>
      {recipeDetail && (
        <div className={style.main_container}>
          <div className={style.recipe_detail}>
            <img src={recipeDetail.image} alt={recipeDetail.name} />

            <div className={style.recipe_info}>
              <h2 className={style.recipe_name}>{recipeDetail.name}</h2>
              <p className={style.recipe_summary}>{recipeDetail.summary}</p>
              {recipeDetail.diets && recipeDetail.diets.length > 0 ? (
                <div className={style.diet_types}>
                  <p className={style.diet_label}>Diets:</p>
                  <ul className={style.diet_list}>
                    {recipeDetail.diets && recipeDetail.diets[0].name
                      ? recipeDetail.diets.map((diet) => (
                          <li key={diet.name} className={style.diet_item}>
                            {diet.name[0].toUpperCase() + diet.name.slice(1)}
                          </li>
                        ))
                      : recipeDetail.diets &&
                        recipeDetail.diets.map((diet) => (
                          <li key={diet} className={style.diet_item}>
                            {diet[0].toUpperCase() + diet.slice(1)}
                          </li>
                        ))}
                  </ul>
                </div>
              ) : (
                <p className={style.diet_item}>There is no diets to show.</p>
              )}

              <p className={style.healthScore}>
                Health Score: {recipeDetail.healthScore}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
