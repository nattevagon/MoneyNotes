import { useModal } from "@/context/ModalContext";
import ConfirmFinishDebt from "../ConfirmFinishDebt";
import ConfirmDelete from "../ConfirmDelete";
import ChooseTypeTransaction from "../ChooseTypeTransaction";
import AddPerson from "../AddPerson";

const GlobalModal = () => {
  const { modalProps, handleConfirm, closeModal } = useModal();

  if (!modalProps.isOpen) return null;

  console.log('modalProps.type', modalProps.type)

  switch (modalProps.type) {
    case "confirmFinishDebt":
      return (
        <ConfirmFinishDebt
          data={modalProps.data}
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
    case "chooseTypeTransaction":
      return (
        <ChooseTypeTransaction
          onClose={closeModal}
        />
      );
    case "addPeople":
      return (
        <AddPerson
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      );
    default:
      return null;
  }
};

export default GlobalModal;