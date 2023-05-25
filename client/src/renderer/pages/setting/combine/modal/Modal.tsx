import React, { PropsWithChildren } from "react";
import "./Modal.scss";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div className="modal2-container">
      <div className="dialog2-box" style={{position: "absolute", transform: "translate(20%, -120%)"}}>{children}</div>
      <div
        className="backdrop2"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </div>
  );
}
