import React from "react";
import style from "./Card.module.css";

export default function Card({ name, diets, image }) {
  return (
    <div className={style.cardStyle}>
      <div className={style.main_img}>
        <img src={image} alt={name} />
      </div>
      <h3 className={style.card_title}>{name}</h3>
      <div className={style.flex_container}>
        {diets?.map((el) => (
          <p key={el} className={style.diet_item}>
            {el[0].toUpperCase() + el.slice(1)}
          </p>
        ))}
      </div>
    </div>
  );
}
