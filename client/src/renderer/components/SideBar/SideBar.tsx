import { useSearchParams, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/logo_black_noslogan.png";
import "./SideBar.scss";
import React from "react";

interface Title {
  title: string;
  value: string;
}

export default function SideBar() {
  const navigate = useNavigate();
  const settings: Title[] = [
    { title: "이리스", value: "0" },
    { title: "시동어 설정", value: "1" },
    { title: "사용자 지정 명령어", value: "2" },
    { title: "명령어 조합 설정", value: "3" },
    { title: "AI 비서 변경", value: "4" },
    { title: "음향 설정", value: "5" },
    { title: "회원정보", value: "6" },
    { title: "가이드", value: "7" },
  ];
  const [searchparams, setSearchParmas] = useSearchParams();

  const tab = searchparams.get("tab");

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {settings.map((item: Title) => {
          return (
            <div
              className={
                tab === item.value
                  ? "sidebar-menu-item selected"
                  : "sidebar-menu-item"
              }
              key={item.value}
              onClick={() => {
                searchparams.set("tab", item.value);
                if (searchparams.get("tab") === "2") {
                  navigate("/setting?tab=2")
                } else if (searchparams.get("tab") === "3") {
                  navigate("/setting?tab=3")
                } else {
                  setSearchParmas(searchparams)
                }
              }}
            >
              {item.title === "이리스" ? (
                <img src={Logo} alt="Iris" className="sidebar-logo" />
              ) : (
                item.title
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
