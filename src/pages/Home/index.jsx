import BalanceBar from "@/components/molecules/BalanceBar"
import FormInput from "@/components/molecules/Form/FormInput";
import ListTransaction from "@/components/molecules/ListTransaction"
import { getStorage, saveStorage } from "@/helper/localStorage";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ListPersonDebt from "@/components/molecules/ListPersonDebt";
import { useModal } from "@/context/ModalContext";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const addPerson = useForm();
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

  const onSubmitPeople = (data) => {
    console.log(data);
    const oldData = getStorage("peoples");

    const newData = {
      id: Date.now(),
      username: data.peopleName.toLowerCase().replace(/\s/g, ""),
      name: data.peopleName,
      role: "admin"
    };

    const updated = [...oldData, newData];
    saveStorage("peoples", updated);
    addPerson.reset();
    fetchPeoples();
  };

  return (
    <div className="px-6 pt-8 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-2">Welcome Back {admin?.name || 'Guest'}!</h1>
        <p className="text-gray-400">Here is a summary of your finances.</p>
      </div>
      <div className="mb-6">
        <BalanceBar transactions={transactions} admin={admin} />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Person debt with you</h2>
        <ListPersonDebt transactions={transactions} admin={admin} />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Transactions</h2>
        <ListTransaction transactions={transactions} admin={admin} onRefreshList={fetchTransactions} />
      </div>
    </div>
  )
}

export default Home