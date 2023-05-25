import React, { useState } from "react";
import Mic from "../../../../../assets/images/Mic.png";
import MicOff from "../../../../../assets/images/Mic off.png";

import "./Volume.scss";

export default function Volume() {
  // 50은 그냥 임의 숫자임 앞으론 설정 저장값을 init파일에서 가져오기
  const [micVolume, setMicVolume] = useState<number>(50);
  const [prevMicVolume, setPrevMicVolume] = useState<number>(50);

  const prcieRangeMinValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMicVolume(parseInt(e.target.value));
  };

  return (
    <div className="volume-wrap">
      <input
        type="number"
        className="volume-typing"
        value={micVolume}
        onChange={(e) => {
          prcieRangeMinValueHandler(e);
        }}
      />
      <img
        src={micVolume === 0 ? MicOff : Mic}
        alt="mic_on"
        className="mic-icon"
        onClick={() => {
          if (micVolume > 0) {
            setPrevMicVolume(micVolume);
            setMicVolume(0);
          } else {
            setMicVolume(prevMicVolume);
          }
        }}
      />
      <input
        type="range"
        min={0}
        max={100}
        className="volume-control"
        value={micVolume}
        onChange={(e) => {
          prcieRangeMinValueHandler(e);
        }}
      />
    </div>
  );
}
