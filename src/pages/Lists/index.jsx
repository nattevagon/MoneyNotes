import ListTransaction from "@/components/molecules/ListTransaction"
import { getStorage } from "@/helper/localStorage";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useModal } from "@/context/ModalContext";
import { clearStorage } from "@/helper/localStorage";

const Lists = () => {
  const [tab, setTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const { openModal } = useModal();

  const fetchTransactions = () => {
    const data = getStorage("listTransactions");

    if (tab === "debt" || tab === "pocket") {
      const dataFiltered = data?.filter(item => item.category === tab);
      setTransactions(dataFiltered);
    } else {
      setTransactions(data);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [tab]);

  const handleTab = (tab) => {
    setTab(tab);
    fetchTransactions();
  }

  const handleClearTransaction = () => {
    openModal("confirmDelete", {
      onConfirm: () => {
        clearStorage("listTransactions");
        fetchTransactions();
      }
    });
  }

  return (
    <div className="px-6 py-8">
      <div className="flex gap-4 justify-between mb-2">
        <h2 className="text-3xl font-medium">Transaction</h2>
        <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => handleClearTransaction()}>
          <TrashIcon className="w-6 h-6 inline-block m-auto" />
        </button>
      </div>
      <div role="tablist" className="tabs tabs-border">
        <a role="tab" className={"text-lg tab" + (tab === "all" ? " tab-active" : "")} onClick={() => handleTab("all")}>All</a>
        <a role="tab" className={"text-lg tab" + (tab === "debt" ? " tab-active" : "")} onClick={() => handleTab("debt")}>Debt</a>
        <a role="tab" className={"text-lg tab" + (tab === "pocket" ? " tab-active" : "")} onClick={() => handleTab("pocket")}>Pocket</a>
      </div>
      <div className="mt-4">
        <ListTransaction transactions={transactions} onRefreshList={fetchTransactions} />
      </div>
    </div>
  )
}

export default Lists