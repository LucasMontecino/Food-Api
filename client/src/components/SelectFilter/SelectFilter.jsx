import React from "react";
import style from "./SelectFilter.module.css";

const SelectFilter = ({ value, onChange, array, textDefault, keyword }) => {
  let defaultArray = [
    { name: "Ascending", value: "asc" },
    { name: "Descending", value: "desc" },
  ];
  let defaultArray2 = [
    { name: "Api", value: "api" },
    { name: "Created", value: "db" },
  ];

  const renderAlphabeticalSelect = () => {
    return (
      <select className={style.select} value={value} onChange={onChange}>
        <option value="">{textDefault}</option>
        {defaultArray.map((el) => (
          <option value={el.value} key={el.name}>
            {el.name}
          </option>
        ))}
      </select>
    );
  };

  const renderCreatedSelect = () => {
    return (
      <select className={style.select} value={value} onChange={onChange}>
        <option value="">{textDefault}</option>
        {defaultArray2.map((el) => (
          <option value={el.value} key={el.name}>
            {el.name}
          </option>
        ))}
      </select>
    );
  };

  const renderNormalSelect = () => {
    return (
      <select className={style.select} value={value} onChange={onChange}>
        <option value="">{textDefault}</option>
        {array?.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name[0].toUpperCase() + el.name.slice(1)}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div className={style.selectContainer}>
      {keyword === "alphabetical" && renderAlphabeticalSelect()}
      {keyword === "created" && renderCreatedSelect()}
      {keyword !== "alphabetical" &&
        keyword !== "created" &&
        renderNormalSelect()}
    </div>
  );
};

export default SelectFilter;
