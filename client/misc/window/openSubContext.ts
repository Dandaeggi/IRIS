import { ipcRenderer } from "electron";

const openSubContext = {
  openSub() {
    ipcRenderer.invoke("open-sub");
  },
  hideSub() {
    ipcRenderer.invoke("hide-sub");
  },
  // 로그인 후 ini 파일 내용 불러오는 내용
  userIni(email: string, info: string) {
    // console.log("dd", email, info);
    ipcRenderer.send("user-ini", email, info);
  },
  // ini 파일 default 상태로 만들기
  makedefault() {
    ipcRenderer.send("make-ini-default");
  },
  // ini 파일 안 내용 불러와서 렌더링 하기
  getIni(callback: (data: any) => void) {
    ipcRenderer.send("get-ini");

    ipcRenderer.on("send-ini", (event, receivedData) => {
      callback(receivedData);
    });
  },
  // ini 파일 내용 수정
  editIni(newData: object, token: string, action: string) {
    ipcRenderer.send("edit-ini", newData, token, action);
  },
  // 마이크 정보 수정 요청
  sendMikeInfo(mikeindex: string) {
    ipcRenderer.send("send-mikeinfo", mikeindex);
  },
  // 스피커 수정 요청
  sendSpeakerInfo(speakerindex: string) {
    ipcRenderer.send("send-speakerinfo", speakerindex);
  },
  // 프로그램 리스트
  getProgramList(callback: (data: any) => void) {
    ipcRenderer.send("get-programlist");
    ipcRenderer.on("send-programlist", (event, receivedData) => {
      callback(receivedData);
    });
  },
};

export type openSubContextApi = typeof openSubContext;

export default openSubContext;
