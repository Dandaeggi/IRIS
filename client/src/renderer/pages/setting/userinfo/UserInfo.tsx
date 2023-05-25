import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Modal from "../modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import "./UserInfo.scss";
// import Logout from "@renderer/pages/start/Logout/Logout";

export default function UserInfo() {
  const [isOpenNicknameModal, setOpenNicknameModal] = useState<boolean>(false);
  const [isOpenPasswordModal, setOpenPasswordModal] = useState<boolean>(false);

  const accessToken = useSelector((state: RootState) => state.strr.accessToken);
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [newNickname, setNewNickname] = useState<string>("");
  const [password, setpPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [ps, setPs] = useState<string>("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  // 비밀번호 입력 처리 함수
  const enterPs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPs(e.target.value);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자와 특수문자를 포함 8자리 이상 입력하세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  const onClickToggleModal = useCallback(() => {
    setOpenNicknameModal(!isOpenNicknameModal);
  }, [isOpenNicknameModal]);

  const onClickToggleModal2 = useCallback(() => {
    setOpenPasswordModal(!isOpenPasswordModal);
  }, [isOpenPasswordModal]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewNickname(e.target.value);
    },
    [setNewNickname]
  );

  const handleChange2 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
    },
    [setNewPassword]
  );

  const handleSubmit = useCallback(() => {
    axios({
      method: "put",
      url: "http://j8b102.p.ssafy.io:9000/user/nickmodify",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        nickname: newNickname,
      },
    })
      .then((res) => {
        setNickname(newNickname);
        setNewNickname("");
        onClickToggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newNickname]);

  const handleSubmit2 = useCallback(() => {
    if (isPassword) {
      axios({
        method: "put",
        url: "http://j8b102.p.ssafy.io:9000/user/pwmodify",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          password: newPassword,
        },
      })
        .then((res) => {
          console.log(res);
          setpPassword(newPassword);
          setNewPassword("");
          onClickToggleModal2();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("비밀번호가 올바르지 않습니다.");
    }
  }, [newPassword, isPassword, accessToken, onClickToggleModal2]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://j8b102.p.ssafy.io:9000/user/userdetail",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setEmail(res.data.data.email);
        setNickname(res.data.data.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">회원정보 수정</div>
        <div className="setting-AI-box">
          <div className="setting-header">나의 정보</div>
        </div>
        {isOpenNicknameModal && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <div className="modal-title">닉네임 수정 </div>
            <div className="setting-edit-info">
              <div className="material-textfield">
                <input
                  placeholder=" "
                  type="text"
                  className="edit-input"
                  onChange={handleChange}
                />
                <label>닉네임</label>
              </div>
            </div>
            <div>
              <button className="modal-btn" onClick={handleSubmit}>
                변경
              </button>
            </div>
          </Modal>
        )}
        {isOpenPasswordModal && (
          <Modal onClickToggleModal={onClickToggleModal2}>
            <div className="modal-title">비밀번호 변경 </div>
            <div className="setting-edit-info">
              <div className="material-textfield">
                <input
                  placeholder=" "
                  type="text"
                  className="edit-input"
                  onChange={(e) => {
                    handleChange2(e);
                    enterPs(e);
                  }}
                />
                <label>password</label>
              </div>
              {ps.length > 0 && (
                <span
                  className="formCheckPassword"
                  style={isPassword ? { color: "green" } : { color: "red" }}>
                  {passwordMessage}
                </span>
              )}
            </div>
            <div>
              <button className="modal-btn" onClick={handleSubmit2}>
                변경
              </button>
            </div>
          </Modal>
        )}
        <div className="setting-userInfo-box">
          <div className="setting-userInfo">
            <div className="nickname-label">아이디</div>
            <div className="user-nickname">{email}</div>
          </div>
        </div>
        <div className="setting-userInfo-box">
          <div className="setting-userInfo">
            <div className="nickname-label">닉네임</div>
            <div className="user-nickname">{nickname}</div>
          </div>
          <button className="setting-edit" onClick={onClickToggleModal}>
            수정
          </button>
        </div>
        <div className="setting-password-box">
          <div className="setting-userInfo">
            <div className="password-label">Password</div>
          </div>
          <button className="setting-edit" onClick={onClickToggleModal2}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
