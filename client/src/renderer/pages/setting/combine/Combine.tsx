import React, { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Add from "../../../../../assets/images/Add.png";
import Edit from "../../../../../assets/images/Edit.png";
import Delete from "../../../../../assets/images/Delete.png";
import "./Combine.scss";

import contextOpensub from "@misc/window/openSubContextApi";

interface Custom {
  id: number;
  title: string;
  orders: any;
}

// interface FormData {
//   open: Array<Array<string>>,
//   close: Array<Array<string>>,
//   capture: Array<Array<string>>
// }

export default function Combine() {
  const navigate = useNavigate();
  // customList 불러오고 useEffect 감싸서 놓고 변경될 때마다 다시 리로드
  const [customList, setCustomList] = useState<Custom[]>([]);

  const handleClickAdd = () => {
    navigate("/setting/combine?tab=3");
  };

  const accessToken = useSelector((state: RootState) => state.strr.accessToken);

  const handleDelete = (deleteId: number, deleteName: string) => {
    setCustomList(customList.filter((item) => item.id !== deleteId));
    contextOpensub.editIni({ name: deleteName }, accessToken, "combinedelete")
  };

  useEffect(() => {
    contextOpensub.getIni((receiveData) => {
      // console.log(receiveData.settings.combine);
      // 되면 초기값은 이걸로 설정
      // setStartword(receiveData.startword);
      const iniData = receiveData.settings.combine;
      const keys = Object.keys(iniData);
      const values = Object.values(iniData);
      // console.log(keys, values);
      const newData : Custom[] = [];
      // console.log(iniData);
      for (let i=0; i < keys.length; i++) {
        newData.push({ id: i, title: keys[i], orders: values[i] })
        // console.log({ id: i, title: keys[i], orders: values[i] })
      }
      // console.log("new", newData)
      setCustomList([...newData])
    });
  }, []);

  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title">명령어 조합 설정</div>
        <div className="custom-box">
          <div className="custom-header">
            <div>조합된 명령어</div>
            <div onClick={handleClickAdd}>
              <img src={Add} alt="add_icon" className="combine-button-icon " />
            </div>
          </div>
          <div className="combine-command-container">
            {customList.length === 0 && <p>아직 조합 명령어가 없습니다.</p>}
            {customList.map((command: Custom) => {
              return (
                <div className="combine-command" key={command.id}>
                  <div className="combine-command-box">
                    <div className="command-title" style={{marginLeft: "2%", marginBottom: "5px"}}>{command.title}</div>
                    <div className="command-orders">
                      {command.orders.open.map((order: Array<string>)=>{
                        return <div key={`${order[0]}opentags`} style={{backgroundColor: "#DEEBFD", marginLeft: "4%", paddingLeft: "2%", paddingRight: "2%", borderRadius: "10px", color: "#101010"}}>{order[0]}</div>
                      })}
                    </div>
                  </div>
                  <div>
                    <img
                      src={Delete}
                      alt="deleteLogo"
                      className="combine-button-icon"
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        handleDelete(command.id, command.title);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
