import React from "react";

const SelectFilter = ({ value, onChange, array, textDefault, keyword }) => {
  let defaultArray = [
    { name: "Ascending", value: "asc" },
    { name: "Descending", value: "desc" },
  ];
  let defaultArray2 = [
    { name: "Api", value: "api" },
    { name: "Created", value: "db" },
  ];
  return (
    <div>
      {keyword === "alphabetical" ? (
        <select value={value} onChange={onChange}>
          <option value="" disabled>
            {textDefault}
          </option>
          {defaultArray.map((el) => (
            <option value={el.value} key={el.name}>
              {el.name}
            </option>
          ))}
        </select>
      ) : keyword === "created" ? (
        <select value={value} onChange={onChange}>
          <option value="">{textDefault}</option>
          {defaultArray2.map((el) => (
            <option value={el.value} key={el.name}>
              {el.name}
            </option>
          ))}
        </select>
      ) : (
        <select value={value} onChange={onChange}>
          <option value="" disabled>
            {textDefault}
          </option>
          {array?.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectFilter;
