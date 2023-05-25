import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Add from "../../../../../assets/images/Add.png";
// import Edit from "../../../../../assets/images/Edit.png";
import Delete from "../../../../../assets/images/Delete.png";
import "./Custom.scss";

import contextOpensub from "@misc/window/openSubContextApi";

type Custom = [string, string];

interface Data {
  [key: string]: string;
}

export default function Custom() {
  const navigate = useNavigate();
  // customList 불러오고 useEffect 감싸서 놓고 변경될 때마다 다시 리로드
  const [customList, setCustomList] = useState<Custom[]>([]);
  const accessToken = useSelector((state: RootState) => state.strr.accessToken);

  const handleClickAdd = () => {
    navigate("/setting/custom?tab=2");
  };

  const handleDelete = (deleteTitle: string) => {
    setCustomList(customList.filter((item) => item[0] !== deleteTitle));
    const data: Data = {};
    data[deleteTitle] = "";
    contextOpensub.editIni({ open: data }, accessToken, "delete");
  };

  useEffect(() => {
    contextOpensub.getIni((receiveData) => {
      // 되면 초기값은 이걸로 설정
      setCustomList(Object.entries(receiveData.settings.custom.open));
    });
  }, []);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">사용자 지정 명령어</div>
        <div className="custom-box">
          <div className="custom-header">
            <div>나의 명령어</div>
            <div onClick={handleClickAdd}>
              <img src={Add} alt="add_icon" className="custom-button-icon" />
            </div>
          </div>
          <div className="custom-command-container">
            {customList.length === 0 ? (
              <div className="custom-command">
                <div className="no-custom-command">
                  등록된 명령어가 없습니다.
                </div>
              </div>
            ) : (
              customList.map((command: Custom) => {
                return (
                  <div className="custom-command" key={command[0]}>
                    <div className="custom-command-box">
                      <div className="command-title">{command[0]}</div>
                      <div className="command-src">
                        {command[1].replace("explorer ", "")}
                      </div>
                    </div>
                    {/* <div>
                      <img
                        src={Edit}
                        alt="editLogo"
                        className="custom-button-icon edit"
                      />
                    </div> */}
                    <div>
                      <img
                        src={Delete}
                        alt="deleteLogo"
                        className="custom-button-icon"
                        onClick={() => {
                          handleDelete(command[0]);
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
            {}
          </div>
        </div>
      </div>
    </div>
  );
}
