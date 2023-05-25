import React, { useState, MouseEvent } from "react";
import "./Select.scss";
import contextOpensub from "@misc/window/openSubContextApi";
import { Value } from "classnames";

interface SelectOptions {
  key: number;
  value: string;
}

interface SelectDefaultType {
  onChange: (data: Array<number | string>) => void;
  selectOptions: Array<any>;
  label: string;
  setCate?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({
  onChange,
  selectOptions,
  label,
  setCate,
}: SelectDefaultType) {
  const [currentValue, setCurrentValue] = useState<string>("선택");
  const [isShowOptions, setShowOptions] = useState<boolean>(false);

  const handleOnChangeSelectValue = (e: MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.target as HTMLLIElement;
    let value;
    for (let i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i][0] === innerText) {
        value = selectOptions[i];
        break;
      }
    }
    setCurrentValue(innerText);
    onChange(value)
  };

  return (
    <div key={label} className="select2-container">
      <div
        className={`select2-box${label === "custom" ? " custom" : ""}`}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <label>{currentValue}</label>
        <ul className={`select2-options${isShowOptions ? ` show ${label}` : ""}`}>
          {selectOptions.map((option) => (
            <li
              key={`li${option[0]}-${label}`}
              onClick={handleOnChangeSelectValue}
              className={`${
                currentValue === option[0] ? "selected-option" : ""
              }`}
            >
              {option[0]}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`select2-backdrop${isShowOptions ? " show" : ""}`}
        onClick={() => {
          if (isShowOptions === true) {
            setShowOptions(false);
          }
        }}
      />
    </div>
  );
}
