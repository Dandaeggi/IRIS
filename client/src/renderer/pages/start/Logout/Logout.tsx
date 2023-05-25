import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  saveAccessToken,
  savedRefreshToken,
} from "../../../../redux/reducers/saveToken";
import { useNavigate } from "react-router-dom";
import FuncIrisSettings from "@misc/window/FuncIrisSettings";
import openSubContext from "@misc/window/openSubContext";

function Logout(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Saved email:", localStorage.getItem("savedEmail"));
  }, []);

  const logout = () => {
    openSubContext.makedefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(saveAccessToken(""));
    dispatch(savedRefreshToken(""));
    navigate("/");
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
