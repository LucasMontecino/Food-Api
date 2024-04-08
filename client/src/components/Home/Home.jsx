import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  getDiets,
  filteredByDiet,
  alphabeticalOrder,
  createdFilter,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from "./Home.module.css";
import { CustomButton } from "../CustomButton/CustomButton";
import SelectFilter from "../SelectFilter/SelectFilter";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const isLoading = useSelector((state) => state.isLoading);

  const [currentPage, setCurrentPage] = useState(0);

  const [order, setOrder] = useState("");
  const [orderDiets, setOrderDiets] = useState("");
  const [createdOrder, setCreatedOrder] = useState("");

  const currentRecipes = () => {
    return allRecipes.slice(currentPage, currentPage + 6);
  };

  const nextPage = () => {
    if (currentPage + 6 < allRecipes.length) {
      setCurrentPage(currentPage + 6);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 6);
    }
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  function handleFilterByDiets(e) {
    e.preventDefault();
    dispatch(filteredByDiet(e.target.value));
    setCurrentPage(0);
    setOrderDiets(e.target.value);
  }

  function handleFilterAlphabeticalOrder(e) {
    e.preventDefault();
    dispatch(alphabeticalOrder(e.target.value));
    setCurrentPage(0);
    setOrder(e.target.value);
  }

  function handleCreatedOrder(e) {
    e.preventDefault();
    dispatch(createdFilter(e.target.value));
    setCurrentPage(0);
    setCreatedOrder(e.target.value);
  }

  const handleReload = () => {
    dispatch(getRecipes());
    dispatch(getDiets());
    setOrder("");
    setOrderDiets("");
    setCreatedOrder("");
    setCurrentPage(0);
  };

  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (isLoading) {
    return <Loading />;
  }

  console.log(theme);

  return (
    <div className={style.container} data-theme={theme}>
      {/* Main Header */}
      <header className={style.main_header}>
        <div className={style.main_title}>
          <Link to="/home">
            <h1>FOOD API</h1>
          </Link>
        </div>

        <div className={style.main_header_left}>
          <Link to="/create">
            <CustomButton text="Create New Recipe" />
          </Link>
          <CustomButton text="Reload Page" onClick={handleReload} />
          <CustomButton
            text={theme === "dark" ? "Light Mode" : "Dark Mode"}
            onClick={handleTheme}
          />
        </div>

        <div className={style.main_header_filtersearchbar}>
          {/* Filtros */}
          <SearchBar setCurrentPage={setCurrentPage} />

          <div className={style.select_container}>
            <SelectFilter
              onChange={handleFilterAlphabeticalOrder}
              textDefault={"A-Z Order"}
              value={order}
              keyword={"alphabetical"}
            />
            <SelectFilter
              array={allDiets}
              onChange={handleFilterByDiets}
              textDefault={"All Diets"}
              value={orderDiets}
            />

            <SelectFilter
              keyword={"created"}
              onChange={handleCreatedOrder}
              textDefault={"All Recipes"}
              value={createdOrder}
            />
          </div>
        </div>
      </header>

      {/* Contenedor principal del Home  */}
      <div className={style.btnDisplay}>
        {currentPage > 0 && <CustomButton text="Prev" onClick={prevPage} />}
        {currentPage + 6 < allRecipes.length && (
          <CustomButton text="Next" onClick={nextPage} />
        )}
      </div>
      <div className={style.grid_container}>
        {currentRecipes()?.map((el) => {
          let diets = el.diets.length
            ? el.diets[0].name
              ? el.diets.map((el) => el.name)
              : el.diets
            : null;
          return (
            <div key={el.id}>
              <Link to={`/home/${el.id}`}>
                <Card
                  image={el.image}
                  name={el.name}
                  diets={diets}
                  key={el.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
