import { ipcRenderer } from "electron";

const receiveSoundInfoContext = {
  receiveSoundInfo(callback: (data: any) => void) {
    ipcRenderer.send("request-data");

    ipcRenderer.on("send-data", (event, receivedData) => {
      callback(receivedData);
    });

    return () => {
      ipcRenderer.removeAllListeners("send-data");
    };
  },
};

export type receiveSoundInfoContextApi = typeof receiveSoundInfoContext;

export default receiveSoundInfoContext;
