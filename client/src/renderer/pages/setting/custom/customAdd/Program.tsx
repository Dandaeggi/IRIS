import React from "react";
import Select from "../select/Select";

type CateProps = {
  setProgram: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  cate: string;
  program: string;
  programlist: Array<SelectOptions>;
};

interface SelectOptions {
  key: number;
  name: string;
  value: string;
}

export default function Program({
  setProgram,
  setStep,
  cate,
  program,
  programlist,
}: CateProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgram(e.target.value);
  };

  return (
    <div className="custom-box">
      <div className="custom-header">
        <div>2. {cate} 선택</div>
      </div>
      <div className="setting-mic-content">어떤 작업을 할 지 등록해주세요.</div>

      {cate === "프로그램" ? (
        <div>
          <Select
            selectOptions={programlist}
            label="custom-add"
            setProgram={setProgram}
          />
        </div>
      ) : (
        <div>
          <div className="setting-mic-content sub">
            https://를 꼭 붙여주세요!{"\u00A0"}
            {"\u00A0"}
            {"\u00A0"}
            {"\u00A0"}
            {"\u00A0"} 예시) https://www.naver.com
          </div>
          <div className="custom-edit-box">
            <div className="my-startword-content">
              <div>
                <input
                  type="text"
                  placeholder="URL을 입력해주세요"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="edit-custom">
        <button
          onClick={() => setStep(3)}
          className={`edit-custom-btn ${
            program === "선택" || program === "" ? " before" : ""
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
