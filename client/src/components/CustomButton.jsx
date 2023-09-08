import React from "react";
import style from "./CustomButton.module.css";

export const CustomButton = ({ text, alHacerClick, type }) => {
  return (
    <div className={style}>
      <button onClick={alHacerClick}>{text}</button>
    </div>
  );
};
