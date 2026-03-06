import { formatDate } from "@/helper/formatDate";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { useModal } from "@/context/ModalContext";

const ListTransaction = ({ transactions, onRefreshList }) => {
  const { openModal } = useModal();

  const handleFinishDebt = (id) => {
    console.log("confirm", id)
    const transactions = getStorage("listTransactions") || [];
    const updatedTransactions = transactions.map(item =>
      String(item.id) === String(id)
        ? { ...item, paidStatus: true }
        : item
    );
    saveStorage("listTransactions", updatedTransactions);
    onRefreshList();
  };

  const handleOpenModal = (category, id) => {
    if (category === 'debt') {
      openModal("confirmFinishDebt", {
        data: id,
        onConfirm: () => handleFinishDebt(id), // callback parent
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {transactions.length > 0 ?
        transactions?.map((item) => (
          <div
            key={item?.id}
            className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer"
            onClick={() => handleOpenModal(item?.category, item?.id)}
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
                <div className="text-1xl font-medium">Rp {item?.amount?.toLocaleString("id-ID")}</div>
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
