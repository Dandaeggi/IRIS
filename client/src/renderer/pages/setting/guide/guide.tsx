import React, { useState } from "react";
import Guide5 from "@assets/images/Guide5.png";
import Guide6 from "@assets/images/Guide6.png";
import Guide7 from "@assets/images/Guide7.png";
import Guide8 from "@assets/images/Guide8.png";
import Guide9 from "@assets/images/youtube2.png";
import Arrow from "@assets/images/arrowleft2.png";
import "./guide.scss";

export default function Guide() {
  const [guideIndex, setGuideIndex] = useState<number>(0);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">가이드</div>
        {guideIndex !== 0 && (
          <div className="guide-go-back">
            <div
              className="back-arrow"
              onClick={() => {
                setGuideIndex(0);
              }}>
              <img src={Arrow} alt="go-back" />
            </div>
          </div>
        )}
        {guideIndex === 0 && (
          <div className="guide-container">
            <div className="upper-cards">
              <div
                className="guide-card"
                onClick={() => {
                  setGuideIndex(1);
                }}>
                <div className="guide-card-title">
                  <img src={Guide8} className="guide-card-img" />
                </div>
                <div className="guide-card-content">검색기능</div>
              </div>
              <div
                className="guide-card"
                onClick={() => {
                  setGuideIndex(2);
                }}>
                <div className="guide-card-title">
                  <img src={Guide5} className="guide-card-img" />
                </div>
                <div className="guide-card-content">프로그램 조작</div>
              </div>
            </div>
            <div className="lower-cards">
              <div
                className="guide-card"
                onClick={() => {
                  setGuideIndex(3);
                }}>
                <div className="guide-card-title">
                  <img src={Guide6} className="guide-card-img" />
                </div>
                <div className="guide-card-content">사용자 지정 명령어</div>
              </div>
              <div
                className="guide-card"
                onClick={() => {
                  setGuideIndex(4);
                }}>
                <div className="guide-card-title">
                  <img src={Guide7} className="guide-card-img" />
                </div>
                <div className="guide-card-content">조합 명령어</div>
              </div>
              <div
                className="guide-card"
                onClick={() => {
                  setGuideIndex(5);
                }}>
                <div className="guide-card-title">
                  <img src={Guide9} className="guide-card-img" />
                </div>
                <div className="guide-card-content">유튜브 모드</div>
              </div>
            </div>
          </div>
        )}
        {guideIndex === 1 && (
          <div className="guide-detail">
            {/* <div className="guide-title">검색기능</div> */}
            <div className="guide-title">구글 검색이 가능해요!</div>
            <div className="guide-content">
              이리스를 부르고 응답창이 뜨면, <b>OOO 검색해줘</b> 라고 말해주세요
            </div>
            <div className="guide-sample">ex) 이리스, 싸피 검색해줘</div>
            <img src={Guide8} alt="" className="guide-img" />
          </div>
        )}
        {guideIndex === 2 && (
          <div className="guide-detail">
            {/* <div className="guide-title">검색기능</div> */}
            <div className="guide-title">
              프로그램과 웹페이지를 쉽게 켜고 끄세요!
            </div>
            <div className="guide-content">
              이리스를 부르고 응답창이 뜨면,
              <b>OOO 열어줘, OOO 켜줘, OOO 실행시켜줘, OOO 꺼줘, OOO 종료해줘</b> 라고 말해주세요.{" "}
              <b>계산기, 그림판, 제어판, 메모장, 유튜브, 구글, 날씨</b>는 따로
              지정하지 않고 켜거나 끌 수 있어요!
            </div>
            <div className="guide-img-box">
              <img src={Guide5} alt="" className="custom-guide-img" />
            </div>
          </div>
        )}
        {guideIndex === 3 && (
          <div className="guide-detail">
            {/* <div className="guide-title">검색기능</div> */}
            <div className="guide-title">
              부르고 싶은 이름으로 등록해주세요!
            </div>
            <div className="guide-content">
              다양한 프로그램과 URL들을 원하는 이름으로 등록해주세요! 등록한
              프로그램과 URL을 실행하거나 끌 수 있습니다.
            </div>
            <div className="guide-img-box">
              <img src={Guide6} alt="" className="guide-img" />
            </div>
          </div>
        )}
        {guideIndex === 4 && (
          <div className="guide-detail">
            {/* <div className="guide-title">검색기능</div> */}
            <div className="guide-title">
              여러 명령어를 한번에 실행해보세요!
            </div>
            <div className="guide-content">
              하나의 명령어로 여러가지 프로그램을 실행시키고, URL을 켤 수
              있습니다!
            </div>
            <div className="guide-img-box">
              <img src={Guide7} alt="" className="guide-img" />
            </div>
          </div>
        )}
        {guideIndex === 5 && (
          <div className="guide-detail">
            <div className="guide-title">유튜브를 편리하게 이용해보세요.</div>
            &nbsp;
            <div className="guide-content">
              시동어를 부르고
              <span className="youtubepoint"> 유튜브 모드 실행</span>을 하시면
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
        )}
      </div>
    </div>
  );
}
