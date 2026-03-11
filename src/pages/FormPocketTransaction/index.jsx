import { useForm, FormProvider } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "@/components/molecules/Form/FormInput";
import FormDatePicker from "@/components/molecules/Form/FormDatePicker";
import FormCurrency from "@/components/molecules/Form/FormCurrency";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUpCircleIcon, ArrowDownCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const FormPocketTransaction = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const addTransaction = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const [pocketType, setPocketType] = useState(false);
  const [admin, setAdmin] = useState([]);
  const pageName = (type === 'add' ? 'Add' : 'Edit') + ' Pocket';
  const isPageAvailable = (type === 'add' || type === 'edit');

  const findAdmin = (data) => {
    return data.find(item => item.role === "admin");
  }

  const fetchAdmin = () => {
    const data = getStorage("peoples");

    if (data) {
      setAdmin(findAdmin(data));
    }
  }

  useEffect(() => {
    fetchAdmin();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const oldData = getStorage("listTransactions");

    const newData = {
      id: Date.now(),
      category: "pocket",
      title: data.title,
      creditor: pocketType === true ? { label: admin.name, value: admin.username } : null,
      debtor: pocketType === false ? { label: admin.name, value: admin.username } : null,
      date: data.date,
      amount: Number(data.amount)
    };

    const updated = [...oldData, newData];
    saveStorage("listTransactions", updated);
    addTransaction.reset();
    navigate("/lists");
  };

  return (
    isPageAvailable && (
      <div className="px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-4 h-4 inline-block m-auto" />
          </button>
          <h2 className="text-2xl font-medium">{pageName}</h2>
        </div>
        <div
          onClick={() => setPocketType(!pocketType)}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#3d3d40] text-white transition-colors cursor-pointer mb-2 hover:bg-[#3d3d40] ${pocketType ? 'bg-[#1bc45b]' : 'bg-[#da2a2a]'}`}
        >
          {pocketType ? <ArrowUpCircleIcon className="w-6 h-6" /> : <ArrowDownCircleIcon className="w-6 h-6" />}
          <p className="text-sm font-normal">{pocketType === true ? 'Income' : 'Outcome'}</p>
        </div>
        <FormProvider {...addTransaction}>
          <form
            onSubmit={addTransaction.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormInput
              name="title"
              label="Title"
              type="text"
              placeholder="Place a title"
            />
            <FormDatePicker
              name="date"
              label="Date"
            />
            <FormCurrency
              name="amount"
              label="Amount"
              type="number"
              placeholder="Place a amount"
            />
            <button className="btn bg-linear-to-r from-[#090040] to-[#065084] text-white w-full mt-4 rounded-lg border border-1 border-[#3d3d40]" type="submit">
              Save
            </button>
          </form>
        </FormProvider>
      </div>
    )
  );
}

export default FormPocketTransaction