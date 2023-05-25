import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import Program from "./Program";
import contextOpensub from "@misc/window/openSubContextApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import Modal from "../modal/Modal";
import Select from "../select/Select";
import "./CombineAdd.scss";
import ".././Combine.scss";
import Tags from "./Tags";

interface Data {
  name: string;
  open: SelectOptions;
}
interface SelectOptions {
  key: number;
  name: string;
  value: string;
}
interface CustomOrders {
  open: object;
}
export default function CustomAdd() {
  const navigate = useNavigate();
  const [customOrders, setCustomOrders] = useState<CustomOrders>({ open: {} });
  const [open, setOpen] = useState<Array<SelectOptions>>([]);
  const [newOpen, setNewOpen] = useState<SelectOptions>({
    key: 0,
    name: "",
    value: "",
  });
  const [close, setClose] = useState<Array<SelectOptions>>([]);
  const [capture, setCapture] = useState<Array<SelectOptions>>([]);
  const [combineOrder, setCombineOrder] = useState<string>("");

  useEffect(() => {
    contextOpensub.getIni((receiveData) => {
      // 되면 초기값은 이걸로 설정
      setCustomOrders(receiveData.settings.custom);
    });
  }, []);

  const accessToken = useSelector((state: RootState) => state.strr.accessToken);

  const submitCustom = () => {
    console.log("제출", open, close, capture);
    // 여기서 ini 파일 변경 하기
    const opendata = open.map((data: SelectOptions) => {
      return [data.name, data.value];
    });
    const data = {
      name: combineOrder,
      open: opendata,
    };
    contextOpensub.editIni(data, accessToken, "combine");
    navigate("/setting?tab=3");
  };

  const plusTag = (id: string) => {
    console.log(id);
    if (id === "open") {
      setOpen([
        ...open,
        {
          key: open.length + close.length + capture.length,
          name: newOpen.name,
          value: newOpen.value,
        },
      ]);
    }
    console.log("open", open);
  };

  const makeTag = (id: string, data: Array<any>) => {
    const ddata = { key: 0, name: data[0], value: data[1] };
    if (id === "open") {
      ddata.key = open.length;
      setNewOpen(ddata);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCombineOrder(e.target.value);
  };
  return (
    <div className="setting-box">
      <div className="setting">
        <div className="setting-title" style={{ marginBottom: "16px" }}>
          명령어 조합
        </div>
        <div className="combine-box">
          <div className="combine-header">
            <small>하나의 명령어로 여러 명령어를 실행해보세요.</small>
          </div>
          <br />
          <div className="combine-edit-box">
            <div className="my-startword-content">
              <div>
                <input
                  className="command-combine"
                  type="text"
                  placeholder="명령어를 입력해주세요"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="line">
            <div className="top-verline-box">
              <div className="verline"></div>
            </div>
            <div className="verline-box">
              <div className="verline2"></div>
            </div>
          </div>
          <div className="makecombine-orders-container">
            <div
              className="orders-box order-color1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ display: "flex", marginTop: "3%" }}>
                <Select
                  onChange={(data: Array<number | string>) => {
                    makeTag("open", data);
                  }}
                  selectOptions={Object.entries(customOrders.open)}
                  label="open"
                />
                <button
                  onClick={() => {
                    plusTag("open");
                  }}
                  style={{ marginTop: "1%", marginLeft: "3%" }}
                  className="edit-combine-btn"
                >
                  추가
                </button>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: "3%",
                  overflowY: "auto",
                }}
              >
                {open.map((command: SelectOptions) => {
                  return (
                    <div
                      key={command.key}
                      style={{
                        backgroundColor: "#DEEBFD",
                        borderRadius: "8px",
                        paddingLeft: "3%",
                        paddingRight: "3%",
                        margin: "4px",
                        fontSize: "20px",
                      }}
                    >
                      {command.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="edit-combine">
            <button
              onClick={() => {
                navigate("/setting?tab=3");
              }}
              className="edit-custom-btn"
              style={{ marginRight: "8px" }}
            >
              취소
            </button>
            <button onClick={submitCustom} className="edit-custom-btn">
              확정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
