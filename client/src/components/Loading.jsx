import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.loading_container}>
      <p>Loading...</p>
      <div className={style.loading_image}></div>
      {/* <img
        src="https://media.giphy.com/media/83xGKHnlQa5yw/giphy.gif"
        alt="Loading..."
        className={style.loading_image}
      /> */}
    </div>
  );
};

export default Loading;
