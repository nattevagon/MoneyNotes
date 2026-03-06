import { createContext, useContext, useState } from "react";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    type: null,
    data: null,
    isOpen: false,
    onConfirm: null, // simpan callback yang benar
  });

  // buka modal dan simpan callback
  const openModal = (type, { data = null, onConfirm = null } = {}) => {
    setModalProps({ type, data, isOpen: true, onConfirm });
  };

  const closeModal = () => {
    setModalProps({ ...modalProps, isOpen: false, type: null, data: null, onConfirm: null });
  };

  // panggil callback yang dikirim parent
  const handleConfirm = () => {
    if (modalProps.onConfirm) {
      modalProps.onConfirm(); // trigger callback parent
    }
    closeModal(); // tutup modal setelah callback
  };

  return (
    <ModalContext.Provider value={{ modalProps, openModal, handleConfirm, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};