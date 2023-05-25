import { openSubContextApi } from "./openSubContext";

const contextOpensub: openSubContextApi = (window as any).electron_window
  ?.openSub;

export default contextOpensub;
