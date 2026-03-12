import ListTransaction from "@/components/molecules/ListTransaction"
import { getStorage, saveStorage } from "@/helper/localStorage";
import { ArrowLeftIcon, CheckBadgeIcon, ClipboardDocumentIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useModal } from "@/context/ModalContext";
import Button from "@/components/atoms/Button";
import { copyText } from "@/helper/copyText";
import { formatCurrency } from "@/helper/formatCurrency";
import { useToast } from "@/context/ToastContext";


const PersonDebt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { openModal } = useModal();
  const [admin, setAdmin] = useState([]);
  const [person, setPerson] = useState([]);
  const { showToast } = useToast();

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
    const dataFiltered = data?.filter(item => item?.creditor?.value === id || item?.debtor?.value === id);
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

  // const handleClearTransaction = () => {
  //   openModal("confirm", {
  //     onConfirm: () => {
  //       clearStorage("listTransactions");
  //       fetchTransactions();
  //     }
  //   });
  // }

  const finishAllDebt = () => {
    const transactions = getStorage("listTransactions") || [];

    const updatedTransactions = transactions.map((item) =>
      item.category === "debt" &&
        [item?.creditor?.value, item?.debtor?.value].includes(person?.username)
        ? { ...item, paidStatus: true }
        : item
    );

    saveStorage("listTransactions", updatedTransactions);
    fetchTransactions(id);
  };

  const exportDebtText = (list) => {
    const filteredList = list.filter(
      item => item.category === "debt" && !item.paidStatus
    );

    const totalAmount = filteredList.reduce((acc, item) => {
      const amount =
        item.debtor?.value === admin?.username ? -item.amount : item.amount;

      return acc + amount;
    }, 0);

    const lines = filteredList.map((item, index) => {
      const creditor = item.creditor?.label;
      const debtor = item.debtor?.label;
      const date = new Date(item.date).toLocaleDateString("id-ID");

      const amount =
        item.debtor?.value === admin?.username ? -item.amount : item.amount;

      return `${index + 1}. ${item.title} | "debt ${debtor} to ${creditor}" | ${date} | ${formatCurrency(amount)}`;
    });

    let text = `Debt with ${person?.name} (${formatCurrency(totalAmount)})\n\n${lines.join("\n")}`;

    if (totalAmount < 0) {
      text += `\n\nSo ${admin?.name} pay debt ${formatCurrency(Math.abs(totalAmount))} to ${person?.name}`;
    }

    if (totalAmount > 0) {
      text += `\n\nSo ${person?.name} pay debt ${formatCurrency(totalAmount)} to ${admin?.name}`;
    }

    return text;
  };

  const fetchListAccount = (username) => {
    const data = getStorage("listAccounts");
    const dataFiltered = data.filter(item => item?.name?.value === username);

    return dataFiltered;
  }

  const paymentData = (list) => {
    const filteredList = list.filter(
      item => item.category === "debt" && !item.paidStatus
    );

    const totalAmount = filteredList.reduce((acc, item) => {
      const amount =
        item.debtor?.value === admin?.username ? -item.amount : item.amount;

      return acc + amount;
    }, 0);

    const objectData = {
      totalAmount: totalAmount,
      recipient: totalAmount > 0 ? admin?.name : person?.name,
      recipientAccounts: totalAmount > 0 ? fetchListAccount(admin?.username) : fetchListAccount(person?.username)
    };

    return objectData;
  };

  const copyDebtText = (list) => {
    const text = exportDebtText(list);
    copyText(text);
    showToast("Copied to clipboard!");
  };

  const handleFinishAllDebt = () => {
    const item = paymentData(transactions);

    openModal("confirmFinishAllDebt", {
      data: {
        type: 'finish',
        title: 'Finish all debt transactions?',
        desc: '',
        allDebt: item,
        admin: admin
      },
      onCopy: () => {
        console.log('copy')
        copyDebtText(transactions);
      },
      onConfirm: () => {
        finishAllDebt();
      }
    });
  }

  return (
    <div className="px-6 py-8">
      <div className="flex gap-4 justify-between mb-2">
        <div className="flex gap-4 justify-between">
          <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => navigate('/')}>
            <ArrowLeftIcon className="w-4 h-4 inline-block m-auto" />
          </button>
          <h2 className="text-2xl font-medium">Person Debt</h2>
        </div>
        {/* <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
          <TrashIcon className="w-6 h-6 inline-block m-auto" />
        </button> */}
      </div>
      <div className="mt-4 px-4 py-6 bg-[#262628] text-white rounded-lg mb-4 border border-1 border-[#3d3d40]">
        <div className="mb-2">
          <h2>Current Balance</h2>
          <p className="text-sm text-gray-400">Debt with {person?.name}</p>
        </div>
        <p className="text-2xl font-medium">{formatCurrency(dataFilteredSummary?.totalDebt || 0)}</p>
        <div className="flex flex-col gap-4 mt-4">
          <Button
            category="primary"
            onClick={() => handleFinishAllDebt()}
          >
            <CheckBadgeIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Finish All Debt</p>
          </Button>
          {/* <Button
            category="secondary"
            onClick={() => copyDebtText(transactions)}
          >
            <ClipboardDocumentIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Copy All Debt</p>
          </Button> */}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Transactions</h2>
        <ListTransaction
          transactions={transactions}
          admin={admin}
          onRefreshList={() => fetchTransactions(id)}
        />
      </div>
    </div>
  )
}

export default PersonDebt