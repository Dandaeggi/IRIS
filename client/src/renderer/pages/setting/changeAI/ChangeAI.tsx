import Beta from "../../../../../assets/images/Beta_version.png";
import Pro from "../../../../../assets/images/Pro_version.png";
import "./ChangeAI.scss";
import React, { useState, useEffect } from "react";

import contextOpensub from "@misc/window/openSubContextApi";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export default function ChangeAI() {
  const [Ai, setAi] = useState<string>("");
  const [newAi, setNewAi] = useState<string>("");

  const accessToken = useSelector((state: RootState) => state.strr.accessToken);

  const handleClick = (ai: string) => {
    setNewAi(ai);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("editini 실행");
    // contextOpensub.editIni({ version: newAi }, accessToken, "add");
    // setAi(newAi);
  };

  useEffect(() => {
    contextOpensub.getIni((receiveData) => {
      // console.log("getini 실행");
      // console.log("ini받아온 데이터", receiveData.settings.version);
      // 되면 초기값은 이걸로 설정
      if (receiveData.settings.version === "google") {
        setAi("BETA");
      }
      setNewAi(receiveData.settings.version);
    });
  }, []);
  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">AI 비서 변경</div>
        <form className="setting-AI-box" onSubmit={handleSubmit}>
          <div className="setting-header">AI 모델</div>
          <div className="setting-mic-content">현재 AI 모델</div>
          <div className="my-now-box">
            <div className="now-AI">{Ai}</div>
          </div>
          <div className="setting-mic-content">AI 모델 변경</div>
          <div className="setting-select-AI">
            <div
              className={`setting-AI-container ${
                newAi === "google" ? " selected" : ""
              }`}
              onClick={() => handleClick("BETA")}
            >
              <div className="setting-AI-img">
                <img
                  src={Beta}
                  alt="google_logo"
                  className="setting-AI-logo"
                />
              </div>
              <div className="setting-AI-content">베타 버전</div>
            </div>
            <div className={`setting-AI-container`} style={{cursor: "not-allowed", backgroundColor: "white"}}>
              <div style={{backgroundColor: "rgba(255, 255, 255, 0.8)", position: "absolute", width: "20%", height: "30%", borderRadius: "8px"}}><p style={{marginTop: "40%"}}>Coming Soon...</p></div>
              <div className="setting-AI-img">
                <img src={Pro} alt="iris_logo" className="setting-AI-logo" />
              </div>
              <div className="setting-AI-content">프로 버전</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            {/* <button className="setting-AI-btn" type="submit">
              변경하기
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
