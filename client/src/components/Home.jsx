import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import style from "./Home.module.css";
import { CustomButton } from "./CustomButton";
// import { SearchBar } from "./SearchBar";
// import Paginate from "./Paginate";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  // console.log(allRecipes);

  const filteredRecipes = () => {
    if (search.length === 0) {
      return allRecipes.slice(currentPage, currentPage + 6);
    }

    const filtered = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 6);
  };

  const nextPage = () => {
    if (
      allRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
      ).length >
      currentPage + 6
    ) {
      setCurrentPage(currentPage + 6);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 6);
    }
  };

  const onSearch = (event) => {
    setCurrentPage(0);
    setSearch(event.target.value);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
  };

  return (
    <>
      {/* Main Header */}
      <header className={style.main_header}>
        <div className={style.main_header_left}>
          <Link to="/recipes">
            <CustomButton text="Crear Nueva Receta" />
          </Link>
          <CustomButton
            text="Cargar todas las recetas"
            alHacerClick={(e) => handleClick(e)}
          />
        </div>

        <h1>FOOD ENCYCLOPEDIA</h1>

        <div className={style.main_header_filtersearchbar}>
          <input
            type="search"
            placeholder="Buscar receta..."
            value={search}
            onChange={onSearch}
          />

          {/* Filtros */}

          <div>
            <select>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </select>

            <select>
              <option value="All">Todas las dietas</option>
              {allDiets?.map((el) => (
                <option value={el.name} key={el.id}>
                  {el.name}
                </option>
              ))}
            </select>

            <select>
              <option value="All">Todos las recetas</option>
              <option value="api">Recetas de la API</option>
              <option value="created">Recetas creadas</option>
            </select>
          </div>
        </div>
      </header>

      {/* Contenedor principal del Home  */}
      <div className={style.btnDisplay}>
        <CustomButton text="Prev" alHacerClick={prevPage} />
        <CustomButton text="Next" alHacerClick={nextPage} />
      </div>
      <div className={style.grid_container}>
        {filteredRecipes()?.map((el) => {
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
    </>
  );
}
