import "./Sound.scss";
import React, { useState, useEffect } from "react";
import receiveSoundInfo from "@misc/window/receiveSoundInfoContextApi";
import Volume from "./Volume";
import Select from "../select/Select";

interface SelectOptions {
  key: number;
  value: string;
}

export default function Sound() {
  const [selectMicOptions, setSelectMicOptions] = useState([]);
  const [selectSpeakerOptions, setSelectSpeakerOptions] = useState([]);

  useEffect(() => {
    const unsubscribe = receiveSoundInfo.receiveSoundInfo(
      async (receivedData) => {
        console.log("receivedData", receivedData);
        const micData = receivedData.mike.slice(1);
        const speakerData = receivedData.speaker.slice(1);
        console.log("micData", micData);
        console.log("speakerData", speakerData);
        const newMic = micData.map((value: string, index: number) => ({
          key: index,
          value,
        }));
        const newSpeaker = speakerData.map((value: string, index: number) => ({
          key: index,
          value,
        }));
        console.log(newMic);
        console.log(newSpeaker);
        setSelectMicOptions(newMic);
        setSelectSpeakerOptions(newSpeaker);
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">음향 설정</div>
        <div className="setting-sound-box speaker">
          <div className="setting-header">스피커</div>
          <div className="setting-mic-content">스피커 설정</div>
          <Select selectOptions={selectSpeakerOptions} label="speaker" />
        </div>
        <div className="setting-sound-box mic">
          <div className="setting-header">마이크</div>
          <div className="setting-mic-content">마이크 설정</div>
          <Select selectOptions={selectMicOptions} label="mic" />
          <div className="setting-mic-content">마이크 볼륨</div>
          <Volume />
        </div>
      </div>
    </div>
  );
}
