import { createContext, useContext, useState } from "react";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    type: null,
    data: null,
    isOpen: false,
    onConfirm: null,
  });

  // buka modal
  const openModal = (type, options = {}) => {
    const { data = null, onConfirm = null } = options;

    setModalProps({
      type,
      data,
      isOpen: true,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModalProps((prev) => ({
      ...prev,
      type: null,
      data: null,
      isOpen: false,
      onConfirm: null,
    }));
  };

  const handleConfirm = () => {
    if (modalProps.onConfirm) {
      modalProps.onConfirm();
    }
    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{ modalProps, openModal, handleConfirm, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};