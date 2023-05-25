import "./StartWord.scss";
import Mic from "../../../../../assets/images/Mic.png";
import React, { useState, useEffect } from "react";
import contextOpensub from "@misc/window/openSubContextApi";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export default function StartWord() {
  const [startword, setStartword] = useState<string>("");
  const [newData, setNewData] = useState<string>("");

  const accessToken = useSelector((state: RootState) => state.strr.accessToken);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    contextOpensub.editIni({ irisname: newData }, accessToken, "add");
    setStartword(newData);
    setNewData("");
  };

  useEffect(() => {
    contextOpensub.getIni((receiveData) => {
      // 되면 초기값은 이걸로 설정
      setStartword(receiveData.settings.irisname);
    });
  }, []);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">시동어 설정</div>
        <div className="setting-startword-box">
          <div className="setting-header">나의 시동어</div>
          <div className="setting-mic-content">현재 시동어</div>
          <div className="my-now-box">
            <div className="startword-title">{startword}</div>
          </div>
          <div className="setting-mic-content">시동어 수정</div>
          <div className="setting-startword">새로운 시동어를 입력해주세요.</div>
          <form className="my-now-box" onSubmit={handleSubmit}>
            <div className="my-startword-content">
              <div>
                <input
                  type="text"
                  placeholder="시동어를 입력해주세요"
                  value={newData}
                  onChange={handleChange}
                />
              </div>
              <button className="edit-startword-btn" type="submit">
                수정
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
