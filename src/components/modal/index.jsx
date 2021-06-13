// Modal.js
import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import PropTypes from "prop-types";

export const Modal = ({ isOpen, onClose, modalData }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <aside
      tag="aside"
      role="dialog"
      tabIndex="-1"
      aria-modal="true"
      className="modal-cover"
    >
      <div className="modal-area">
        <b>{modalData.title}</b>
        <button
          aria-label="Close Modal"
          aria-labelledby="close-modal"
          className="modal-close"
          onClick={onClose}
        >
          <span id="close-modal">X</span>
        </button>

        <div className="modal-body">
          {console.log(modalData)}
          {Object.keys(modalData).map((key,ind) => {
            if (typeof modalData[key] === "string" && modalData[key]) {
              return (
                <div key={ind.toString()+modalData.id}>
                  {key}: {modalData[key]}
                </div>
              );
            }
          })}
        </div>
      </div>
    </aside>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  modalData: PropTypes.object,
};

export default Modal;
