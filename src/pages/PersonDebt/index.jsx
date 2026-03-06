import ListTransaction from "@/components/molecules/ListTransaction"
import { getStorage } from "@/helper/localStorage";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useModal } from "@/context/ModalContext";
import { clearStorage } from "@/helper/localStorage";

const PersonDebt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { openModal } = useModal();
  const [admin, setAdmin] = useState([]);
  const [person, setPerson] = useState([]);

  const findAdmin = (data) => {
    return data.find(item => item.role === "admin");
  }

  const findPerson = (data, id) => {
    return data.find(item => item?.username === id);
  }

  const fetchPeoples = (id) => {
    const data = getStorage("peoples");
    console.log('find person', findPerson(data, id), data)

    if (data) {
      setAdmin(findAdmin(data));
      setPerson(findPerson(data, id));
    }
  }

  const fetchTransactions = (id) => {
    const data = getStorage("listTransactions");
    const dataFiltered = data?.filter(item => item.creditor.value === id || item.debtor.value === id);
    setTransactions(dataFiltered);

    console.log('dataFiltered', dataFiltered)
  }

  useEffect(() => {
    fetchPeoples(id);
    fetchTransactions(id);
    console.log('id', id)
  }, [id]);


  const dataFilteredSummary = transactions.reduce((acc, item) => {
    if (
      item.category !== "debt" ||
      item.paidStatus ||
      ![item.creditor?.value, item.debtor?.value].includes(admin?.username)
    ) return acc;

    const isCreditor = item.creditor.value === admin?.username;
    const person = isCreditor ? item.debtor : item.creditor;

    if (person.value !== id) return acc;

    if (!acc) {
      acc = {
        username: person.value,
        name: person.label,
        totalDebt: 0
      };
    }

    acc.totalDebt += isCreditor ? item.amount : -item.amount;

    return acc;
  }, null);

  console.log('data summray', dataFilteredSummary)

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
        <div>
          <h2 className="text-3xl font-medium mb-2">Person Debt</h2>
        </div>
        {/* <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
          <TrashIcon className="w-6 h-6 inline-block m-auto" />
        </button> */}
      </div>
      <div className="mt-4 px-4 py-6 bg-[#065084] text-white rounded-lg mb-4 border border-1 border-[#3d3d40]">
        <h2 className="mb-2">Current Balance with {person?.name}</h2>
        <p className="text-2xl font-medium">Rp {dataFilteredSummary?.totalDebt?.toLocaleString("id-ID") || '0'}</p>
      </div>
      <div className="mt-4">
        <ListTransaction transactions={transactions} onRefreshList={fetchTransactions} />
      </div>
    </div>
  )
}

export default PersonDebt