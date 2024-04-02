import React from "react";
import style from "./Loading.module.css";
import useLocalStorage from "../hooks/useLocalStorage";

const Loading = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  return (
    <div className={style.loading_container} data-theme={theme}>
      <div className={style.loading_image}></div>
      <p>Loading Foods...</p>
    </div>
  );
};

export default Loading;
