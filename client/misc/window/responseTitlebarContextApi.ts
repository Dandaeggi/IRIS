import { ResponseTitlebarContextApi } from "./responseTitlebarContext";

const context: ResponseTitlebarContextApi = (window as any).electron_window
  ?.titlebar;

export default context;
