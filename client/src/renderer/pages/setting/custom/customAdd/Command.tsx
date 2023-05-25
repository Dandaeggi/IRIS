import React from "react";

type CommandProps = {
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  submitCustom: () => void;
  command: string;
};

export default function Command({
  setCommand,
  submitCustom,
  command,
}: CommandProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };
  return (
    <div className="custom-box">
      <div className="custom-header">
        <div>3. 명령어 등록</div>
      </div>
      <div className="setting-mic-content">
        방금 등록한 작업을 어떻게 부를지 등록해주세요.
      </div>
      <div className="custom-edit-box">
        <div className="my-startword-content">
          <div>
            <input
              className="command"
              type="text"
              placeholder="명령어를 입력해주세요"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="edit-custom">
        <button
          onClick={submitCustom}
          className={`edit-custom-btn ${command === "" ? " before" : ""}`}
        >
          추가
        </button>
      </div>
    </div>
  );
}
