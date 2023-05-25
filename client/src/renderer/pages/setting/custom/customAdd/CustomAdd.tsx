import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import Program from "./Program";
import Command from "./Command";
import contextOpensub from "@misc/window/openSubContextApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import Arrow from "@assets/images/arrowleft2.png";
import "./CustomAdd.scss";

interface Data {
  [key: string]: string;
}

interface SelectOptions {
  key: number;
  name: string;
  value: string;
}

export default function CustomAdd() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [cate, setCate] = useState<string>("선택");
  const [program, setProgram] = useState<string>("선택");
  const [command, setCommand] = useState<string>("");
  const [programlist, setProgramlist] = useState<Array<SelectOptions>>([]);

  const accessToken = useSelector((state: RootState) => state.strr.accessToken);
  // const refreshToken = useSelector(
  //   (state: RootState) => state.strr.refreshToken
  // );

  const submitCustom = () => {
    console.log("제출", cate, program, command);
    // 여기서 ini 파일 변경 하기
    const data: Data = {};
    data[command] = program;
    if (cate === "URL") {
      contextOpensub.editIni({ open: data }, accessToken, "addURL");
    } else {
      contextOpensub.editIni({ open: data }, accessToken, "addProgram");
    }
    navigate("/setting?tab=2");
  };

  useEffect(() => {
    contextOpensub.getProgramList((data: any) => {
      console.log("custom-add 내 getProgramList", data);
      // const datalist = [];
      // for (let i = 1; i < data.length; i += 3) {
      //   console.log(data[i+2].trim().split(",")[0].replace('/\"/gi', ''))
      //   datalist.push({ key: i, name: data[i+1].trim(), value: data[i+2].trim().split(",")[0].replace('/"/gi', '')})
      // }
      let start = -1;
      for (let i = 0; i < data.length; i += 3) {
        if (data[i] === "I0R0I0S5" && start === -1) {
          start = i;
          break;
        }
      }
      const datalist = [];
      for (let i = start; i < data.length; i += 3) {
        const value = data[i + 2].trim().split(",")[0].replace(/"/g, "");
        console.log(value);
        datalist.push({ key: i, name: data[i + 1].trim(), value: value });
      }
      setProgramlist(datalist);
    });
  }, []);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="guide-go-back">
          <div
            className="back-arrow"
            onClick={() => {
              if (step === 1) {
                navigate("/setting?tab=2");
              } else if (step === 2) {
                // 선택값들 초기화도 해야함
                setStep(1);
              } else {
                setStep(2);
              }
            }}
          >
            <img src={Arrow} alt="back-arrow" />
          </div>
        </div>
        <div className="setting-title">사용자 지정 명령어 등록</div>
        {step === 1 && (
          <Category cate={cate} setCate={setCate} setStep={setStep} />
        )}
        {step === 2 && (
          <Program
            program={program}
            programlist={programlist}
            setProgram={setProgram}
            setStep={setStep}
            cate={cate}
          />
        )}
        {step === 3 && (
          <Command
            command={command}
            setCommand={setCommand}
            submitCustom={submitCustom}
          />
        )}
      </div>
    </div>
  );
}
