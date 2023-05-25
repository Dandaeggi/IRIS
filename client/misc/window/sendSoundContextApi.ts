import { sendSoundContextApi } from "./sendSoundContext";

const sendSoundContext: sendSoundContextApi = (window as any).electron_window
  ?.sendSound;

export default sendSoundContext;
