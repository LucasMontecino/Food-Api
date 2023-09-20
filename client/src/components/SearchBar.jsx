import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import style from "./SearchBar.module.css";
import { CustomButton } from "./CustomButton";
import { getRecipesName } from "../actions";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const [name, setName] = useState("");

  function handleInputChange(e) {
    setName(e.target.value);
  }
  function handleKeyUp(e) {
    if (e.target.value && e.key === "Enter") {
      performSearch();
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (name.length > 0) {
      performSearch();
    }
  }

  function performSearch() {
    dispatch(getRecipesName(name));
    setCurrentPage(0);
    setName("");
  }

  if (error) {
    return <div className={style.errorMessage}>{error}</div>;
  }

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        value={name && name[0].toUpperCase() + name.slice(1)}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        placeholder="Enter recipe name..."
      />
      <CustomButton
        onClick={handleSubmit}
        text={<FontAwesomeIcon icon={faSearch} />}
      />
      {/* {error && <div className={style.errorMessage}>{error}</div>} */}
    </div>
  );
};

export default SearchBar;
