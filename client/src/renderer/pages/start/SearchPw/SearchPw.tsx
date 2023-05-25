import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import axios from "axios";
import "./SearchPw.scss";
import Alert from "@components/Alert/Alert";
import Larrow from "@assets/images/Larrow.png";

const SearchPw: React.FC = () => {
  const [spEmail, setSpEmail] = useState<string | null>(null);
  const handleGoBack = () => {
    window.history.back();
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("error");
  const [alertMessage, setAlertMessage] = useState("");
  const modalRef = useRef(null);

  const showAlert = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const enterEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setSpEmail(e.target.value);
  };

  const callSearchPwCheck = () => {
    if (spEmail) {
      axios({
        method: "post",
        url: `http://j8b102.p.ssafy.io:9000/user/findpassword`,
        data: {
          email: spEmail,
        },
      })
        .then((res) => {
          if (res.data.result === "fail") {
            showAlert("error", res.data.message);
          } else {
            showAlert("success", res.data.message);
          }
        })
        .catch((err) => {
          showAlert("error", "email을 정확히 입력해 주세요");
        });
    }
  };

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setAlertVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={modalRef}>
      {alertVisible && (
        <Alert type={alertType} message={alertMessage} onClose={closeAlert} />
      )}
      <div className="Leftbox" onClick={handleGoBack}>
        <img src={Larrow} className="Larrow" />
        <div className="Ltitle">Back</div>
      </div>
      <div className="SearchPwBox">
        <span className="SearchPwTitle">Searching Password</span>
        <span className="SearchText">아래에 이메일을 적어주세요.</span>
        <span className="SearchText2"> 임시비밀번호를 보내 드릴게요.</span>
        <div className="Email">
          <span className="EmialTitle">Email</span>
          <input
            className="emailinput"
            placeholder="iris@iris.com"
            onChange={enterEmail}
          />
        </div>
        <button className="messagesendbtn" onClick={callSearchPwCheck}>
          임시비밀번호 전송하기
        </button>
      </div>
    </div>
  );
};

export default SearchPw;
