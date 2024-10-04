import React from 'react';
import './Modal.css'; 

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <button className="modal-close" onClick={onClose}>
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
