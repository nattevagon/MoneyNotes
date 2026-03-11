import ListTransaction from "@/components/molecules/ListTransaction"
import { Cog8ToothIcon, EllipsisVerticalIcon, IdentificationIcon, ListBulletIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom"
import { useModal } from "@/context/ModalContext";
import { getStorage, clearStorage } from "@/helper/localStorage";

const Lists = () => {
  const [tab, setTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const { openModal } = useModal();
  const [admin, setAdmin] = useState([]);

  const fetchTransactions = () => {
    const data = getStorage("listTransactions");

    if (tab === "debt" || tab === "pocket") {
      const dataFiltered = data?.filter(item => item.category === tab);
      setTransactions(dataFiltered);
    } else {
      setTransactions(data);
    }
  }

  const findAdmin = (data) => {
    return data.find(item => item.role === "admin");
  }

  const fetchPeoples = () => {
    const data = getStorage("peoples");

    if (data) {
      setAdmin(findAdmin(data));
    }
  }

  useEffect(() => {
    fetchPeoples();
    fetchTransactions();
  }, [tab]);

  const handleTab = (tab) => {
    setTab(tab);
    fetchTransactions();
  }

  const handleClearTransaction = () => {
    openModal("confirm", {
      data: {
        type: 'delete',
        title: 'Delete all data transactions?',
        desc: ''
      },
      onConfirm: () => {
        clearStorage("listTransactions");
        fetchTransactions();
      }
    });
  }

  return (
    <div className="px-6 py-8">
      <div className="flex gap-4 justify-between mb-2">
        <h2 className="text-2xl font-medium">Transactions</h2>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn flex aligns-center justify-left px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
            <EllipsisVerticalIcon className="w-4 h-4 inline-block m-auto" />
          </div>
          <div tabIndex="-1" className="dropdown-content menu mt-2 rounded-box z-1 w-52">
            <div className="bg-[#262628] rounded-lg z-1 w-52 p-4 border border-1 border-[#3d3d40] flex flex-col gap-2">
              <button className="flex items-center justify-left gap-2 px-4 py-2 rounded-lg bg-[#1e1e1f] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => handleClearTransaction()}>
                <TrashIcon className="w-4 h-4 inline-block" />
                Delete all
              </button>
              {/* <Link to={"/history"} className="flex items-center justify-left gap-2 px-4 py-2 rounded-lg bg-[#1e1e1f] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
              <ListBulletIcon className="w-4 h-4 inline-block" />
              History
            </Link> */}
              <Link to={"/account"} className="flex items-center justify-left gap-2 px-4 py-2 rounded-lg bg-[#1e1e1f] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
                <IdentificationIcon className="w-4 h-4 inline-block" />
                Accounts
              </Link>
              {/* <Link to={"/settings"} className="flex items-center justify-left gap-2 px-4 py-2 rounded-lg bg-[#1e1e1f] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
              <Cog8ToothIcon className="w-4 h-4 inline-block" />
              Settings
            </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div role="tablist" className="tabs tabs-border">
        <a role="tab" className={"text-lg tab" + (tab === "all" ? " tab-active" : "")} onClick={() => handleTab("all")}>All</a>
        <a role="tab" className={"text-lg tab" + (tab === "debt" ? " tab-active" : "")} onClick={() => handleTab("debt")}>Debt</a>
        <a role="tab" className={"text-lg tab" + (tab === "pocket" ? " tab-active" : "")} onClick={() => handleTab("pocket")}>Pocket</a>
      </div>
      <div className="mt-4">
        <ListTransaction transactions={transactions} admin={admin} onRefreshList={fetchTransactions} />
      </div>
    </div>
  )
}

export default Lists