import { contextBridge } from "electron";
import titlebarContext from "./titlebarContext";
import openSubContext from "./openSubContext";
import responseTitlebarContextApi from "./responseTitlebarContext";
import getSttContext from "./getSttContext";
import sendSoundContext from "./sendSoundContext";
import receiveSoundInfoContext from "./receiveSoundInfoContext";

contextBridge.exposeInMainWorld("electron_window", {
  titlebar: titlebarContext,
  openSub: openSubContext,
  responseTitlebar: responseTitlebarContextApi,
  getStt: getSttContext,
  sendSound: sendSoundContext,
  receiveSoundInfo: receiveSoundInfoContext,
});
