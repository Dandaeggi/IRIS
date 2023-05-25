import "./Login.scss";
import Logo from "../../../../../assets/logos/logo_black.png";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  saveAccessToken,
  savedRefreshToken,
} from "../../../../redux/reducers/saveToken";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import contextOpensub from "@misc/window/openSubContextApi";
import Alert from "@components/Alert/Alert";

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signEmail, setSignEmail] = useState<string>("");
  const [signPs, setSignPs] = useState<string>("");
  const [autoLoginEnabled, setAutoLoginEnabled] = useState<boolean>(false);
  const [saveEmailEnabled, setSaveEmailEnabled] = useState<boolean>(false);
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

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setAlertVisible(false);
    }
  };

  const enterSignId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignEmail(e.target.value);
  };

  const signIn = () => {
    if (signEmail && signPs) {
      if (saveEmailEnabled) {
        localStorage.setItem("savedEmail", signEmail);
      } else {
        localStorage.removeItem("savedEmail");
      }

      axios({
        method: "post",
        url: `http://j8b102.p.ssafy.io:9000/user/login`,
        data: {
          email: signEmail,
          password: signPs,
        },
      })
        .then((res) => {
          if (res.data.result === "success") {
            const accessToken = res.data.data.tokenDto.accessToken;
            const refreshToken = res.data.data.tokenDto.refreshToken;
            console.log(accessToken);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            dispatch(saveAccessToken(accessToken));
            dispatch(savedRefreshToken(refreshToken));

            const firstLogin = localStorage.getItem("firstLogin") === "true";
            setTimeout(() => {
              if (firstLogin) {
                localStorage.setItem("firstLogin", "false");
                navigate("/first-login");
              } else {
                navigate("/loading");
              }
            }, 2000);

            axios({
              method: "get",
              url: `http://j8b102.p.ssafy.io:9000/user/userdetail`,
              headers: {
                Authorization: `Bearer ${res.data.data.tokenDto.accessToken}`,
              },
            })
              .then((res) => {
                console.log("로그인");
                contextOpensub.userIni(
                  res.data.data.email,
                  res.data.data.settings
                );
              })
              .catch((err) => {
                console.log("로그인 후 settings 가져오는 axios 실패", err);
              });

            showAlert("success", res.data.message);
          } else {
            showAlert("error", res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert("error", "사용자가 존재하지 않습니다.");
        });
    } else {
      showAlert("error", "아이디와 비밀번호를 입력해주세요");
    }
  };

  const autoLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      navigate("/loading");
      dispatch(saveAccessToken(accessToken));
      dispatch(savedRefreshToken(refreshToken));
      axios({
        method: "get",
        url: `http://j8b102.p.ssafy.io:9000/user/userdetail`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          console.log("로그인");
          contextOpensub.userIni(res.data.data.email, res.data.data.settings);
        })
        .catch((err) => {
          console.log("로그인 후 settings 가져오는 axios 실패", err);
        });
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setSignEmail(savedEmail);
      setSaveEmailEnabled(true);
    }
  }, []);

  useEffect(() => {
    autoLogin();
  }, []);

  const enterSignPs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignPs(e.target.value);
  };

  useEffect(() => {
    if (autoLoginEnabled) {
      localStorage.setItem("autoLoginEnabled", "true");
      autoLogin();
    } else {
      localStorage.removeItem("autoLoginEnabled");
    }
  }, [autoLoginEnabled]);

  const toggleSaveEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveEmailEnabled(e.target.checked);
  };

  const toggleAutoLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoLoginEnabled(e.target.checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      signIn();
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
      <div className="Loginbox">
        <img src={Logo} alt="Iris" className="login-logo" />
        <input
          className="emailInput"
          placeholder="E-mail"
          value={signEmail}
          onChange={enterSignId}
        />
        <input
          className="passwordInput"
          placeholder="Password"
          type="password"
          onChange={enterSignPs}
          onKeyDown={handleKeyDown}
        />
        <div className="save-auto">
          <div className="save-email">
            <input
              type="checkbox"
              id="save-email"
              checked={saveEmailEnabled}
              onChange={toggleSaveEmail}
            />
            <label htmlFor="save-email">Save Email</label>
          </div>
          <div className="auto-login-checkbox">
            <input
              type="checkbox"
              id="auto-login"
              checked={autoLoginEnabled}
              onChange={toggleAutoLogin}
            />
            <label htmlFor="auto-login">Auto-login</label>
          </div>
        </div>
        <button className="loginbtn" onClick={signIn}>
          Login
        </button>
        <div className="find-create-box">
          <Link to="/searchpw">
            <span className="forget-password">Forget Password</span>
          </Link>
          <div> | </div>
          <Link to="/signup">
            <span className="create-account">Create an account!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
