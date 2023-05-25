import React, { useState } from "react";
import "./FirstGuide.scss";
import Guide5 from "@assets/images/Guide5.png";
import Guide6 from "@assets/images/Guide6.png";
import Guide7 from "@assets/images/Guide7.png";
import Guide8 from "@assets/images/Guide8.png";
import Rarrow from "@assets/images/Rarrow.png";
import Larrow from "@assets/images/Larrow.png";
import { Link } from "react-router-dom";

function FirstGuide() {
  const [pageIndex, setPageIndex] = useState(0);

  const handleContinueClick = () => {
    if (pageIndex < 4) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div className="Guidebox">
      <Link to="/loading">
        <span className="skip">skip</span>
      </Link>
      {pageIndex === 0 && (
        <>
          <h1 className="h1Title">구글 검색이 가능해요!</h1>
          <h2 className="h2Title">
            <span>
              이리스를 부르고 응답창이 뜨면, <b>OOO 검색해줘</b> 라고 말해주세요
            </span>
            <span>ex) 이리스, 싸피 검색해줘</span>
          </h2>
          <img src={Guide8} className="Guideimage1" />
        </>
      )}
      {pageIndex === 1 && (
        <>
          <h1 className="h1Title"> 프로그램과 웹페이지를 쉽게 켜고 끄세요!</h1>
          <h2 className="h2Title">
            <b>OOO 열어줘, OOO 켜줘, OOO 실행시켜줘</b> 라고 말해주세요. <br />
            <b>계산기, 그림판, 제어판, 메모장, 유튜브, 구글</b>은 따로 지정하지
            않고 켜거나 끌 수 있어요!
          </h2>

          <img src={Guide5} className="Guideimage2" />
        </>
      )}
      {pageIndex === 2 && (
        <>
          <h1 className="h1Title"> 부르고 싶은 이름으로 등록해주세요!</h1>
          <h2 className="h2Title">
            다양한 프로그램과 URL들을 원하는 이름으로 등록해주세요! <br />
            등록한 프로그램과 URL을 실행하거나 끌 수 있습니다.
          </h2>
          <img src={Guide6} className="Guideimage1" />
        </>
      )}
      {pageIndex === 3 && (
        <>
          <h1 className="h1Title"> 여러 명령어를 한번에 실행해보세요!</h1>
          <h2 className="h2Title">
            하나의 명령어로 여러가지 프로그램을 실행시키고, URL을 켤 수
            있습니다!
          </h2>
          <img src={Guide7} className="Guideimage1" />
        </>
      )}
      {pageIndex === 4 && (
        <>
          <div className="guide-detail">
            <div className="guide-title">유튜브를 편리하게 이용해보세요.</div>
            <div className="guide-content">
              시동어를 부르고 &nbsp;
              <span className="youtubepoint">유튜브 모드 실행</span>을 하시면
              아래와 같은 명령어가 가능합니다.
              <ul className="command-list">
                <li>전체 화면</li>
                <li>앞으로 (10초 앞으로)</li>
                <li>뒤로 (10초 뒤로)</li>
                <li>다음 (다음 동영상)</li>
                <li>이전 (이전 동영상 - 재생목록이 있을 경우만 동작)</li>
                <li>스킵, 건너뛰기 (광고 스킵 버튼을 찾아서 클릭)</li>
                <li>정지 (동영상 정지, 두번 말하면 재생)</li>
              </ul>
              유튜브 모드를 종료하고 싶으시면 &nbsp;
              <span className="youtubepoint">유튜브 모드 종료</span>라고
              말해주세요.
            </div>
            <div className="guide-img-box"></div>
          </div>
        </>
      )}
      <div className="Leftbox" onClick={handleBackClick}>
        {pageIndex > 0 && (
          <>
            <img src={Larrow} className="Larrow" />
            <div className="Ltitle">Back</div>
          </>
        )}
      </div>
      <div className="Rightbox" onClick={handleContinueClick}>
        {pageIndex === 4 ? (
          <Link to="/loading">
            <div className="Rtitle">start</div>
          </Link>
        ) : (
          <div className="Rtitle">continue</div>
        )}
        <img src={Rarrow} className="Rarrow" />
      </div>
    </div>
  );
}

export default FirstGuide;
