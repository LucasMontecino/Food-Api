import React from "react";

const SelectFilter = ({ value, onChange, array, textDefault }) => {
  let defaultArray = [
    { name: "Ascending", value: "asc" },
    { name: "Descending", value: "desc" },
  ];
  return (
    <div>
      {array ? (
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
      ) : (
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
      )}
    </div>
  );
};

export default SelectFilter;
