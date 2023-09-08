// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getRecipesName } from "../actions";
// import style from "./SearchBar.module.css";

// export const SearchBar = () => {
//   const dispatch = useDispatch();

//   const [name, setName] = useState("");

//   const handleChange = (e) => {
//     e.preventDefault();
//     setName(e.target.value);
//     // setName("");
//   };

//   useEffect(() => {
//     dispatch(getRecipesName(name));
//   }, [dispatch, name]);

//   return (
//     <div className={style.searchBar}>
//       <input
//         type="text"
//         placeholder="Busque su receta..."
//         onChange={(e) => handleChange(e)}
//         value={name}
//       />
//     </div>
//   );
// };
