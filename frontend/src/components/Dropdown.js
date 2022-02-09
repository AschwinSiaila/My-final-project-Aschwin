import React from "react";

export const Dropdown = (props) => {
  console.log(props);
  return (
    <div>
      <h2>{props.question}</h2>
      <select required>
        {props.optionsArray.map((object) => (
          <option className={"dropdown"} key={object.value} value={object.value}>
            {object.text}
          </option>
        ))}
      </select>
    </div>
  );
};
