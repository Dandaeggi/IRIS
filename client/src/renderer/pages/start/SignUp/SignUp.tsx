import "./SignUp.scss";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import contextOpensub from "@misc/window/openSubContextApi";
import Alert from "@components/Alert/Alert";
import Larrow from "@assets/images/Larrow.png";

function SignUp() {
  const handleGoBack = () => {
    window.history.back();
  };
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string>("");
  const [emailCodeCheck, setEmailCodeCheck] = useState<boolean>(false);
  const [emailresdata, setEmailresdata] = useState<string>("");
  const [ps1, setPs1] = useState<string>("");
  const [ps2, setPs2] = useState<string>("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [psCheck, setPsCheck] = useState<boolean>(false);
  const [psWarn, setPsWarn] = useState<boolean>(false);
  const [decode, setDecode] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const psInput = useRef<HTMLInputElement>(null);
  const [iniData, setIniData] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("error");
  const [alertMessage, setAlertMessage] = useState("");
  const modalRef = useRef(null);
  const [decodePs1, setDecodePs1] = useState<boolean>(false);
  const [decodePs2, setDecodePs2] = useState<boolean>(false);

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

  // 이메일 입력 처리 함수
  const enterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailCheck(false);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;

    if (!emailRegex.test(emailCurrent)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  // 이메일 코드 입력 처리 함수
  const enterEmailCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);
  };

  // 이메일 중복 체크 함수
  const callEmailCheck = () => {
    if (isEmail) {
      axios
        .post(`http://j8b102.p.ssafy.io:9000/user/dupli`, { email: email })
        .then((res) => {
          if (res.data.result === "fail") {
            showAlert("error", res.data.message);
            setEmailCheck(false);
            console.log(res.data);
          } else {
            showAlert("success", res.data.message);
            setEmailCheck(res.data);
            setEmailCheck(true);
            console.log(res.data);
          }
        })
        .catch(() => {
          showAlert("error", "중복확인 실패했습니다");
        });
    } else {
      showAlert("error", "email형식을 맞춰주세요");
    }
  };

  // 이메일로 인증코드 전송 함수(중복 체크를 해서 emailCheck가 true일 때만 실행)
  const sendToEmail = () => {
    if (!emailCheck) {
      showAlert("error", "이메일 중복 확인을 해주세요.");
      return;
    }

    if (isEmail) {
      axios
        .post(`http://j8b102.p.ssafy.io:9000/user/sendemail`, {
          email: email,
        })
        .then((res) => {
          setEmailCheck(true);
          showAlert("success", res.data.message);
          console.log(res.data.data);
          setEmailresdata(res.data.data);
        })
        .catch((err) => {
          showAlert("error", "인증번호를 보내지 못했습니다.");
          console.log(err.data);
        });
    } else {
      showAlert("error", "이메일 형식을 지켜주세요");
    }
  };

  // 이메일로 받은 코드 확인하는 함수
  const checkEmailCode = () => {
    if (emailCode === "") {
      showAlert("error", "인증번호를 입력해주세요.");
      return;
    }

    if (emailCode === emailresdata) {
      setEmailCodeCheck(true);
      showAlert("success", "인증번호 확인 완료!");
    } else {
      setEmailCodeCheck(false);
      showAlert("error", "인증번호가 올바르지 않습니다.");
    }
  };

  // 비밀번호 입력 처리 함수
  const enterPs1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPs1(e.target.value);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  // 비밀번호2 입력 처리 함수
  const enterPs2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPs2(e.target.value);
  };

  const decodePs1Handler = () => {
    setDecodePs1(!decodePs1);
  };

  const decodePs2Handler = () => {
    setDecodePs2(!decodePs2);
  };

  // 비밀번호 표시/숨김 처리 함수
  useEffect(() => {
    if (decode === true) {
      psInput.current.type = "text";
    } else {
      psInput.current.type = "password";
    }
  }, [decode]);

  // 비밀번호 일치 확인 함수
  const callPsCheck = (ps1: string, ps2: string) => {
    if (ps1 === ps2) {
      setPsCheck(true);
      setPsWarn(false);
    } else {
      setPsCheck(false);
      setPsWarn(true);
    }
  };

  useEffect(() => {
    callPsCheck(ps1, ps2);
  }, [ps1, ps2]);

  // 회원가입 함수
  useEffect(() => {
    contextOpensub.getIni((receiveData) => {
      console.log("ini받아온 데이터", receiveData);
      setIniData(JSON.stringify(receiveData));
    });
  }, []);
  const signUp = () => {
    if (emailCheck && emailCodeCheck && psCheck) {
      axios({
        method: "post",
        url: `http://j8b102.p.ssafy.io:9000/user/signup`,
        data: {
          email: email,
          password: ps1,
          nickname: nickname,
          settings: iniData,
        },
      })
        .then((res) => {
          console.log(res);
          showAlert("success", "회원가입이 완료되었습니다. 로그인해주세요!");
          localStorage.setItem("firstLogin", "true");

          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          showAlert("error", "오류가 났습니다!");
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
      <div className="SingUpBox">
        <span className="SignUpTitle">Sign up</span>
        <div className="Email">
          <span className="EmailTitle">Email</span>
          <button className="Emailcheck" onClick={callEmailCheck}>
            중복확인
          </button>
          <div className="emailbox">
            <input
              className="emailinput"
              placeholder="iris@iris.com"
              value={email}
              onChange={enterEmail}
            />
            <button className="pushnumber" onClick={sendToEmail}>
              인증번호 보내기
            </button>
          </div>
          <div className="checkbox">
            <input
              className="checkinput"
              placeholder="인증번호 입력해 주세요"
              value={emailCode}
              onChange={enterEmailCode}
            />
            <button className="checkbtn" onClick={checkEmailCode}>
              확인
            </button>
          </div>
        </div>
        <div className="Password">
          <span className="PasswordTitle">password</span>
          <input
            className="paswwordInput"
            ref={psInput}
            type={decodePs1 ? "text" : "password"}
            value={ps1}
            onChange={enterPs1}
          />
          <button
            className={!decodePs1 ? "ShowPassword" : "HidePassword"}
            onClick={(e) => {
              e.preventDefault();
              decodePs1Handler();
            }}
          />

          {ps1.length > 0 && (
            <span
              className="formCheckMessage"
              style={isPassword ? { color: "green" } : { color: "red" }}>
              {passwordMessage}
            </span>
          )}
          <span className="PasswordCheckTitle">pasword check</span>
          <input
            className="paswwordCheckInput"
            type={decodePs2 ? "text" : "password"}
            value={ps2}
            onChange={enterPs2}
          />
          <button
            className={!decodePs2 ? "ShowPassword2" : "HidePassword2"}
            onClick={(e) => {
              e.preventDefault();
              decodePs2Handler();
            }}
          />

          {psWarn && ps2.length >= 1 ? (
            <span className="passwordWarning">비밀번호가 다릅니다!</span>
          ) : null}
          <div className="Nickname">
            <span className="NicknameTitle">nickname</span>
            <input
              className="NicknameInput"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}>
          <button className="SignUpbtn" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
