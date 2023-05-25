import { ipcRenderer } from "electron";

const sendSoundContext = {
  sendSoundData(data: string) {
    ipcRenderer.invoke("toMain", data);
  },
  receiveSoundInfo(data: string) {
    ipcRenderer.invoke("fromMain", data);
  }
};

export type sendSoundContextApi = typeof sendSoundContext;

export default sendSoundContext;
