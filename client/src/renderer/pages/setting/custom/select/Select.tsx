import React, { useState, MouseEvent } from "react";
import "./Select.scss";
import contextOpensub from "@misc/window/openSubContextApi";

interface SelectOptions {
  key: number;
  name: string;
  value: string;
}

interface SelectDefaultType {
  selectOptions: SelectOptions[];
  label: string;
  setProgram?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({
  selectOptions,
  label,
  setProgram,
}: SelectDefaultType) {
  const [currentValue, setCurrentValue] = useState<string>("선택");
  const [isShowOptions, setShowOptions] = useState<boolean>(false);

  const handleOnChangeSelectValue = (e: MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.target as HTMLLIElement;
    setCurrentValue(innerText);
    for (let i = 0; i < selectOptions.length; i++) {
      if (innerText === selectOptions[i].name) {
        setProgram(selectOptions[i].value);
      }
    }
    // 선택한 내용 다르게 보내기 함수 추가
  };

  return (
    <div className="select-container">
      <div
        className={`select-box${label === "custom" ? " custom" : ""}`}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <label>{currentValue}</label>
        <ul
          className={`select-options${isShowOptions ? ` show ${label}` : ""}`}
        >
          {selectOptions
            .sort(function (a, b) {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
            .map((option) => (
              <li
                key={option.key}
                value={option.value}
                onClick={handleOnChangeSelectValue}
                className={`${
                  currentValue === option.value ? "selected-option" : ""
                }`}
              >
                {option.name}
              </li>
            ))}
        </ul>
      </div>
      <div
        className={`select-backdrop${isShowOptions ? " show" : ""}`}
        onClick={() => {
          if (isShowOptions === true) {
            setShowOptions(false);
          }
        }}
      />
    </div>
  );
}
