// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Response.scss";
import "../Application.scss";
import contextGetStt from "../../../../misc/window/getSttContextApi";
import TestAudio from "./testauido";

const Response: React.FC = () => {
  const [sttData, setSttData] = useState("");

  useEffect(() => {
    contextGetStt.getSTT((text: any) => {
      console.log("Response getText, received data:", text);
      const newtext = text;
      setSttData(newtext);
    });
  }, [sttData]);

  return (
    <div className="Response">
      <TestAudio />
      <div className="message">{sttData}</div>
    </div>
  );
};

export default Response;
