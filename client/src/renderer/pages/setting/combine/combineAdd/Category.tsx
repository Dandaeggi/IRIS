import React from "react";
import Select from "../../select/Select";

type CateProps = {
  setCate: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Category({ setCate, setStep }: CateProps) {
  return (
    <div className="custom-box">
      <div className="custom-header">
        <div>1. 카테고리 선택</div>
      </div>
      <div className="setting-mic-content">
        등록하려는 명령어가 프로그램인지 URL인지 선택해주세요.
      </div>
      <Select
        selectOptions={[
          { key: 0, value: "프로그램" },
          { key: 1, value: "URL" },
        ]}
        label="custom"
        setCate={setCate}
      />
      <div className="edit-custom">
        <button onClick={() => setStep(2)} className="edit-custom-btn">
          다음
        </button>
      </div>
    </div>
  );
}
