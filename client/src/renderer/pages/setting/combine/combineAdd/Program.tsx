import React from "react";

type CateProps = {
  setProgram: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  cate: string;
};

export default function Program({ setProgram, setStep, cate }: CateProps) {
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
          <div>프로그램 선택 박스</div>
          <div>네모 안 이름</div>
        </div>
      ) : (
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
      )}
      <div className="edit-custom">
        <button onClick={() => setStep(3)} className="edit-custom-btn">
          다음
        </button>
      </div>
    </div>
  );
}
