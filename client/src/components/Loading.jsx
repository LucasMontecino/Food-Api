import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.loading_container}>
      <div className={style.loading_image}></div>
      <p>Loading Foods...</p>
    </div>
  );
};

export default Loading;
