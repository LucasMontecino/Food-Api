import React from "react";
import style from "./CustomButton.module.css";

export const CustomButton = ({ text, onClick, type }) => {
  return (
    <div className={style}>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};
