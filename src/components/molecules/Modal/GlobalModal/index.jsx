import { useModal } from "@/context/ModalContext";
import ConfirmFinishDebt from "../ConfirmFinishDebt";
import ConfirmDelete from "../ConfirmDelete";

const GlobalModal = () => {
  const { modalProps, handleConfirm, closeModal } = useModal();

  if (!modalProps.isOpen) return null;

  switch (modalProps.type) {
    case "confirmFinishDebt":
      return (
        <ConfirmFinishDebt
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      );
    case "confirmDelete":
      return (
        <ConfirmDelete
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      );
    default:
      return null;
  }
};

export default GlobalModal;