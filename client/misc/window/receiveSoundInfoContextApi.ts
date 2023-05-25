// receiveSoundInfoContextApi.tsx
import { receiveSoundInfoContextApi } from "./receiveSoundInfoContext";

const receiveSoundInfo: receiveSoundInfoContextApi = (window as any)
  .electron_window?.receiveSoundInfo;

export default receiveSoundInfo;
