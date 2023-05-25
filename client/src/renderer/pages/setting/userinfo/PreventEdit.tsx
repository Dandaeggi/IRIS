import React, { useState } from "react";
import "./PreventEdit.scss";
import UserInfo from "./UserInfo";
import axios from "axios";

export default function PreventEdit(): JSX.Element {
  const [checkpassowrd, setCheckpassowrd] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [checkMessage, CheckSetMessage] = useState("");

  const PwCheck = () => {
    const token = localStorage.getItem("accessToken");

    axios({
      method: "post",
      url: `http://j8b102.p.ssafy.io:9000/user/checkpassword`,
      data: {
        password: checkpassowrd,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.result === "success") {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
        CheckSetMessage(res.data.message);
      })
      .catch((err) => {
        console.log(token);
      });
  };

  const enterSignPs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckpassowrd(e.target.value);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      PwCheck();
    }
  }
  return (
    <div>
      {!isChecked ? (
        <div className="setting-box">
          <div className="setting">
            <div className="setting-title">회원정보 수정</div>
            <div className="setting-AI-box">
              <div className="setting-header">나의 정보</div>

              <div className="passwordcheckbox">
                <input
                  className="passwordInput"
                  placeholder="Password"
                  type="password"
                  onChange={enterSignPs}
                  onKeyDown={handleKeyDown}
                />
                {!isChecked && checkMessage ? (
                  <span className="passwordcheckmsg" style={{ color: "red" }}>
                    {checkMessage}
                  </span>
                ) : null}
                <button className="passwordcheckbtn" onClick={PwCheck}>
                  비밀번호 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UserInfo />
      )}
    </div>
  );
}
