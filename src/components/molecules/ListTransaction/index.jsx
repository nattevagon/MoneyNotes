import { formatDate } from "@/helper/formatDate";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { useModal } from "@/context/ModalContext";
import { useNavigate } from "react-router-dom";

const ListTransaction = ({ transactions, admin, limit = null, onRefreshList }) => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const handleFinishDebt = (id) => {
    const transactions = getStorage("listTransactions") || [];

    const updatedTransactions = transactions.map((item) => {
      if (item?.id === id && !item?.paidStatus) {
        return { ...item, paidStatus: true };
      }
      return item;
    });

    saveStorage("listTransactions", updatedTransactions);
    onRefreshList();
  };

  const handleOpenModal = (item) => {
    console.log('item', item)
    if (item?.category === 'debt') {
      openModal("confirmFinishDebt", {
        data: item,
        onEdit: () => navigate('/debt-transaction/edit/' + item?.id),
        onDelete: () => handleClearThisTransaction(item),
        onConfirm: () => handleFinishDebt(item?.id), // callback parent
      });
    }
  }

  const handleRemoveTransaction = (id) => {
    const oldData = getStorage("listTransactions") || [];
    const updated = oldData.filter(item => item?.id !== id);

    saveStorage("listTransactions", updated);
    onRefreshList();
  };

  const handleClearThisTransaction = (item) => {
    openModal("confirmWithDetail", {
      data: {
        type: 'delete',
        title: 'Delete this data transaction?',
        desc: '',
        transaction: item,
        admin: admin
      },
      onConfirm: () => {
        handleRemoveTransaction(item?.id);
      }
    });
  }

  const listWithLimit = [...(transactions || [])]
    .sort((a, b) => new Date(b?.date) - new Date(a?.date))
    .slice(0, limit || transactions?.length);

  return (
    <div className="flex flex-col gap-4">
      {transactions.length > 0 ?
        listWithLimit?.map((item) => (
          <div
            key={item?.id}
            className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer"
            onClick={() => handleOpenModal(item)}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-lg text-white">{item?.title}</p>
                <p className="text-sm text-gray-400">{formatDate(item?.date)}</p>
                {item?.category === "debt" && (
                  <p className="text-sm text-gray-400">Debt {item?.debtor?.label} to {item?.creditor?.label}</p>
                )}
              </div>
              <div>
                <div className="text-1xl font-medium">Rp {item?.creditor?.value !== admin?.username ? '-' : ''}{item?.amount?.toLocaleString("id-ID")}</div>
                {item?.category === "debt" && (
                  <p className={"text-sm text-right" + (item?.paidStatus ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{item?.paidStatus ? "Paid" : "Unpaid"}</p>
                )}
                {item?.category === "pocket" && (
                  <p className={"text-sm text-right" + (item?.creditor ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{item?.creditor ? "Income" : "Outcome"}</p>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40]">
            <p className="text-gray-400">No transactions found.</p>
          </div>
        )}
    </div>
  )
}

export default ListTransaction
