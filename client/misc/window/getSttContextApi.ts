import { getSttContextApi } from "./getSttContext";

const contextGetStt: getSttContextApi = (window as any).electron_window?.getStt;

export default contextGetStt;
