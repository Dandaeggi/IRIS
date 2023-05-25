import React, { useState, MouseEvent } from "react";
import "./Select.scss";
import contextOpensub from "@misc/window/openSubContextApi";

interface SelectOptions {
  key: number;
  value: string;
}

interface SelectDefaultType {
  selectOptions: SelectOptions[];
  label: string;
  setCate?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({
  selectOptions,
  label,
  setCate,
}: SelectDefaultType) {
  const [currentValue, setCurrentValue] = useState<string>("선택");
  const [isShowOptions, setShowOptions] = useState<boolean>(false);

  const handleOnChangeSelectValue = (e: MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.target as HTMLLIElement;
    setCurrentValue(innerText);
    if (innerText === "프로그램") {
      setCate && setCate("프로그램");
    } else {
      setCate && setCate("URL");
    }
    // 라벨이 마이크 스피커에 따라서
    if (label === "mic") {
      // sendSoundContext.sendSoundData(innerText);
      contextOpensub.sendMikeInfo(innerText);
    } else if (label === "speaker") {
      contextOpensub.sendSpeakerInfo(innerText);
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
          {selectOptions.map((option) => (
            <li
              key={option.key}
              value={option.value}
              onClick={handleOnChangeSelectValue}
              className={`${
                currentValue === option.value ? "selected-option" : ""
              }`}
            >
              {option.value}
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
