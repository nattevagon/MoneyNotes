import { useModal } from "@/context/ModalContext";
import ConfirmFinishDebt from "../ConfirmFinishDebt";
import ChooseTypeTransaction from "../ChooseTypeTransaction";
import AddPerson from "../AddPerson";
import Confirm from "../Confirm";
import DetailAccount from "../DetailAccount";
import ConfirmWithDetail from "../ConfirmWithDetail";

const GlobalModal = () => {
  const { modalProps, handleConfirm, handleEdit, handleDelete, closeModal } = useModal();

  if (!modalProps.isOpen) return null;

  console.log('modalProps.type', modalProps.type)
  console.log('modalProps.data', modalProps.data)

  switch (modalProps.type) {
    case "confirmFinishDebt":
      return (
        <ConfirmFinishDebt
          data={modalProps.data}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      );
    case "confirm":
      return (
        <Confirm
          data={modalProps.data}
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      );
    case "confirmWithDetail":
      return (
        <ConfirmWithDetail
          data={modalProps.data}
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
    case "addPerson":
      return (
        <AddPerson
          data={modalProps.data}
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      );
    case "detailAccount":
      return (
        <DetailAccount
          data={modalProps.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      );
    default:
      return null;
  }
};

export default GlobalModal;