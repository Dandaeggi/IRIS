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
    <div className="modal-container">
      <div
        className="dialog-box"
        style={{ position: "absolute", transform: "translate(20%, -60%)" }}
      >
        {children}
      </div>
      <div
        className="backdrop"
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
