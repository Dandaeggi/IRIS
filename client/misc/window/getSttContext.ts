import { ipcRenderer } from "electron";

const getSttContext = {
  please(): Promise<string> {
    return new Promise((resolve, reject) => {
      ipcRenderer.on("stt", (event, ...args) => {
        resolve(args[0]);
        reject("dd");
      });
    });
  },
  // 이걸로 사용해도 됌
  getText(callback: (data: string) => void) {
    ipcRenderer.on("stt", (event, text) => {
      callback(text);
    });
  },
  // 테스트용 send text
  // 이거는 파이썬에서 이뤄져야하거나,
  // 파이썬에서 메인으로 데이터를 쏴서 받았을 때
  sendData(sendText: string) {
    ipcRenderer.send("send-text", sendText);
  },
  // STT 시작하고 STT에서 자비스가 들어오길 기다렸다가 들어오면 return
  getSTT(callback: (data: any) => void) {
    ipcRenderer.send("get-STT");
    const listener = (event: any, receivedData: any) => {
      console.log("Received data:", receivedData);
      callback(receivedData);
    };

    ipcRenderer.on("send-stt", listener);

    // 이벤트 리스너가 올바르게 추가되었는지 확인
    console.log("Event listener added for send-stt");

    return () => {
      ipcRenderer.removeListener("send-stt", listener);
    };
  },
};

export type getSttContextApi = typeof getSttContext;

export default getSttContext;
