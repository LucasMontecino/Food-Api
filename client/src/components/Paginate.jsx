// import React from "react";
// import style from "./Paginate.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getRecipes } from "../actions";
// import { useEffect } from "react";

// export default function Paginate({ currentPage, setCurrentPage }) {
//   const dispatch = useDispatch();
//   const allRecipes = useSelector((state) => state.recipes);
//   const nextPage = () => {
//     if (currentPage <= allRecipes.length - 12) setCurrentPage(currentPage + 12);
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 12);
//     }
//   };

//   useEffect(() => {
//     dispatch(getRecipes());
//   }, [dispatch]);

//   return (
//     <div className={style.paginateContainer}>
//       {currentPage > 0 ? (
//         <div>
//           <button onClick={prevPage}>Prev Page</button>
//         </div>
//       ) : null}
//       {currentPage <= allRecipes.length - 12 ? (
//         <div>
//           <button onClick={nextPage}>Next Page</button>
//         </div>
//       ) : null}
//     </div>
//   );
// }
