import { createContext, useContext, useState } from "react";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    type: null,
    data: null,
    isOpen: false,
    onConfirm: null,
    onDelete: null
  });

  // buka modal
  const openModal = (type, options = {}) => {
    const { data = null, onConfirm = null, onDelete = null } = options;

    setModalProps({
      type,
      data,
      isOpen: true,
      onConfirm,
      onDelete
    });
  };

  const closeModal = () => {
    setModalProps((prev) => ({
      ...prev,
      type: null,
      data: null,
      isOpen: false,
      onConfirm: null,
      onDelete: null
    }));
  };

  const handleConfirm = () => {
    const callback = modalProps.onConfirm;

    closeModal();

    setTimeout(() => {
      if (callback) callback();
    }, 0);
  };

  const handleDelete = () => {
    const callback = modalProps.onDelete;

    closeModal();

    setTimeout(() => {
      if (callback) callback();
    }, 0);
  };

  return (
    <ModalContext.Provider
      value={{ modalProps, openModal, handleConfirm, handleDelete, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};