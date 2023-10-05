import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import SelectFilter from "./SelectFilter";
import { CustomButton } from "./CustomButton";
import style from "./RecipeCreate.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Name is required";
  if (!input.summary) errors.summary = "Summary is required";
  if (!input.healthScore) errors.healthScore = "Health Score is required";

  return errors;
}

const RecipeCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allDiets = useSelector((state) => state.diets);

  const [button, setButton] = useState(true);
  const [errors, setErrors] = useState({});

  const [orderDiets, setOrderDiets] = useState("");

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    diets: [],
  });

  useEffect(() => {
    if (
      input.name.length > 0 &&
      input.summary.length > 0 &&
      input.healthScore.length > 0
    )
      setButton(false);
    else setButton(true);
  }, [input, setButton]);

  function inputHandleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setOrderDiets(e.target.value);
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("New Recipe was create successfully!");
    setInput({
      name: "",
      summary: "",
      healthScore: "",
      image: "",
      diets: [],
    });
    history.push("/home");
  }

  function dietHandleDelete(e) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== e),
    });
  }

  function handleHome() {
    window.location.href = "/home";
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={style.main_container}>
      <div className={style.return_container}>
        <CustomButton text={"Return to Home"} onClick={handleHome} />
      </div>
      <form id="form" onSubmit={handleSubmit} className={style.form_container}>
        <h1>Create Your Recipe!</h1>
        <div>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Enter Recipe Name"
            onChange={inputHandleChange}
          />
        </div>
        <div className={style.form_error}>
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <textarea
            value={input.summary}
            name="summary"
            placeholder="Enter Summary Recipe"
            onChange={inputHandleChange}
          />
        </div>
        <div className={style.form_error}>
          {errors.summary && <p>{errors.summary}</p>}
        </div>

        <div>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            placeholder="Enter a Valid HealthScore"
            onChange={inputHandleChange}
          />
        </div>
        <div className={style.form_error}>
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>

        <div>
          <input
            type="text"
            value={input.image}
            name="image"
            placeholder="Give a Valid Url"
            onChange={inputHandleChange}
          />
        </div>

        <div className={style.select_container}>
          <SelectFilter
            array={allDiets}
            onChange={handleSelect}
            textDefault={"Diets"}
            value={orderDiets}
          />
        </div>

        <div className={style.container}>
          <h2 className={style.diet_title}>Diets</h2>

          <div className={style.diet_container}>
            {input.diets.map((el) => (
              <div
                key={el}
                onClick={() => dietHandleDelete(el)}
                className={style.diet_item_container}
              >
                <p className={style.diet_item}>{el}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={style.buttom_container}>
          <CustomButton
            disabled={button}
            text={"Create Recipe"}
            type={"submit"}
            form={"form"}
          />
        </div>
      </form>
    </div>
  );
};

export default RecipeCreate;
