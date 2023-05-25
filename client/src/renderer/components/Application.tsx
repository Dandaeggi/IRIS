import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./Application.scss";
import Settings from "../pages/setting/Settings";
import Login from "../pages/start/Login/Login";
import SignUp from "../pages/start/SignUp/SignUp";
import SearchPw from "../pages/start/SearchPw/SearchPw";
import FirstGuide from "@renderer/pages/start/FirstGuide/FirstGuide";
import Loading from "@renderer/pages/start/Loading/Loading";

const Application: React.FC = () => {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/searchpw" element={<SearchPw />} />
            {/* <Route path="/" element={<Settings />} /> */}
            <Route path="/first-login" element={<FirstGuide />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/setting/custom" element={<Settings />} />
            <Route path="/setting/combine" element={<Settings />} />
            <Route path="/setting/userinfo" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default Application;
