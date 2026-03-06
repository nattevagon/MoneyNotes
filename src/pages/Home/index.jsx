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
  const addPeople = useForm();
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
      document.getElementById('addAdmin').showModal();
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
    addPeople.reset();
    fetchPeoples();
    document.getElementById('addAdmin').close();
  };

  return (
    <div className="px-6 pt-8 pb-2">
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-2">Welcome Back {admin?.name || 'Guest'}!</h1>
        <p className="text-gray-400">Here is a summary of your finances.</p>
      </div>
      <div className="mb-6">
        <BalanceBar transactions={transactions} admin={admin} />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Person Debt</h2>
        <ListPersonDebt transactions={transactions} admin={admin} />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Transaction</h2>
        <ListTransaction transactions={transactions} onRefreshList={fetchTransactions} />
      </div>
      <dialog id="addAdmin" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Add your name</h3>
          <div>
            <FormProvider {...addPeople}>
              <form
                onSubmit={addPeople.handleSubmit(onSubmitPeople)}
                className="space-y-4"
              >
                <FormInput
                  name="peopleName"
                  type="text"
                  placeholder="Place a name"
                />
                <button className="btn bg-linear-to-r from-[#090040] to-[#065084] text-white w-full mt-4 rounded-lg border border-1 border-[#3d3d40]" type="submit">
                  Save
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Home