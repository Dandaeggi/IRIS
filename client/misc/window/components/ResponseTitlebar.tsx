import React, { useContext } from "react";
import ResponseControls from "./ResponseControls";
import { WindowContext } from "./WindowFrame";
import "./Titlebar.less";

const ResponseTitlebar: React.FC = () => {
  const windowContext = useContext(WindowContext);

  return (
    <div className="response-titlebar" style={{ height: "20vh" }}>
      <ResponseControls platform={windowContext.platform} tooltips={true} />
    </div>
  );
};

export default ResponseTitlebar;
