import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const ModalHeader = ({ children, className = "" }) => (
  <div className={`p-4 md:p-6 pb-2 ${className}`}>{children}</div>
);

const ModalTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg md:text-xl font-bold text-gray-900 ${className}`}>
    {children}
  </h2>
);

const ModalContent = ({ children, className = "" }) => (
  <div className={`p-4 md:p-6 pt-2 ${className}`}>{children}</div>
);

const ModalFooter = ({ children, className = "" }) => (
  <div
    className={`p-4 md:p-6 pt-2 flex justify-end gap-2 flex-wrap ${className}`}
  >
    {children}
  </div>
);

export { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter };
