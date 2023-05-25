import React from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Home from "./home/Home";
import StartWord from "./startword/StartWord";
import ChangeAI from "./changeAI/ChangeAI";
import PreventEdit from "./userinfo/PreventEdit";
// import UserInfo from "./userinfo/UserInfo";
import Sound from "./sound/Sound";
import Custom from "./custom/Custom";
import CustomAdd from "./custom/customAdd/CustomAdd";
import Combine from "./combine/Combine";
import CombineAdd from "./combine/combineAdd/CombineAdd";
import Guide from "./guide/guide";
import "./Settings.scss";

export default function Settings() {
  const location = useLocation();
  const [searchparams] = useSearchParams();
  const tab = searchparams.get("tab");

  return (
    <div className="settings">
      <SideBar />
      {tab === "0" ? <Home /> : ""}
      {tab === "1" ? <StartWord /> : ""}
      {location.pathname === "/setting" && tab === "2" ? <Custom /> : ""}
      {location.pathname === "/setting/custom" && tab === "2" ? (
        <CustomAdd />
      ) : (
        ""
      )}
      {location.pathname === "/setting" && tab === "3" ? <Combine /> : ""}
      {location.pathname === "/setting/combine" && tab === "3" ? (
        <CombineAdd />
      ) : (
        ""
      )}
      {tab === "4" ? <ChangeAI /> : ""}
      {tab === "5" ? <Sound /> : ""}
      {tab === "6" ? <PreventEdit /> : ""}
      {tab === "7" ? <Guide /> : ""}
    </div>
  );
}
