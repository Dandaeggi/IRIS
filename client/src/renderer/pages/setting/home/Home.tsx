import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../../assets/images/logo_black_noslogan.png";
import "./Home.scss";

export default function Home() {
  // 페이지 이동
  const navigate = useNavigate();
  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">
          <img src={Logo} alt="Iris" className="main-logo" />
        </div>
        <div className="setting-content">
          당신의 AI 비서 iris 입니다. 언제든지 불러주세요!
        </div>
        <span className="setting-h2">
          명령어를 실행할 때&nbsp; <span className="h2point">시동어</span>를
          먼저 불러주세요.
        </span>
        <div className="setting-img main-img" />
        <div
          className="setting-sub-content home"
          onClick={() => {
            navigate("/setting?tab=1");
          }}>
          시동어를 변경하고 싶으시면 {"\u00A0"} <a>여기를 눌러주세요</a>
        </div>
      </div>
    </div>
  );
}
