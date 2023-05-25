import React from "react";
import "./Alert.scss";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <span className="modaltitle">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <div className="line"></div>
      <span className="modalmessage">{message}</span>
    </div>
  );
};

export default Alert;
