import BalanceBar from "@/components/molecules/BalanceBar"
import FormInput from "@/components/molecules/Form/FormInput";
import ListTransaction from "@/components/molecules/ListTransaction"
import { getStorage, saveStorage } from "@/helper/localStorage";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ListPersonDebt from "@/components/molecules/ListPersonDebt";
import { useModal } from "@/context/ModalContext";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [admin, setAdmin] = useState([]);
  const { openModal } = useModal();

  const findAdmin = (data) => {
    return data.find(item => item.role === "admin");
  }

  const fetchPeoples = () => {
    const data = getStorage("peoples");

    if (data) {
      setAdmin(findAdmin(data));
    }
  }

  const fetchTransactions = () => {
    const data = getStorage("listTransactions");

    if (data) {
      setTransactions(data);
    }
  }

  useEffect(() => {
    const dataPeoples = getStorage("peoples");

    if (dataPeoples && !dataPeoples.find(item => item.role === "admin")) {
      const item = {
        type: 'admin'
      }
      openModal("addPerson", {
        data: item,
        onConfirm: () => fetchPeoples(), // callback parent
      });
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchPeoples();
  }, []);

  return (
    <div className="px-6 py-8">
      <div>
        <h1 className="text-2xl font-medium mb-1">Welcome Back {admin?.name || 'Guest'}!</h1>
        <p className="text-gray-400">Here is a summary of your finances.</p>
      </div>
      <div className="mt-6">
        <BalanceBar transactions={transactions} admin={admin} />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Person debt with you</h2>
        <ListPersonDebt transactions={transactions} admin={admin} />
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-4 justify-between mb-4">
          <h2 className="text-lg font-medium">Latest Transactions</h2>
          <Link to="/lists" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
            <ArrowRightIcon className="w-5 h-5 inline-block m-auto" />
          </Link>
        </div>
        <ListTransaction transactions={transactions} limit={4} admin={admin} onRefreshList={fetchTransactions} />
      </div>
    </div>
  )
}

export default Home