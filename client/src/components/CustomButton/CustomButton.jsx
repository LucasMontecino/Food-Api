import React from "react";
import style from "./CustomButton.module.css";

export const CustomButton = ({ text, onClick, form, disabled, type }) => {
  return (
    <div className={style}>
      <button onClick={onClick} type={type} disabled={disabled} form={form}>
        {text}
      </button>
    </div>
  );
};
