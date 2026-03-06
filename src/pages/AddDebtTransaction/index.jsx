import { useForm, FormProvider } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "@/components/molecules/Form/FormInput";
import FormSelect from "@/components/molecules/Form/FormSelect";
import FormDatePicker from "@/components/molecules/Form/FormDatePicker";
import FormCurrency from "@/components/molecules/Form/FormCurrency";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";

const AddDebtTransaction = () => {
  const navigate = useNavigate();
  const addTransaction = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const [peoples, setPeoples] = useState([]);
  const { openModal } = useModal();

  const fetchPeoples = () => {
    const data = getStorage("peoples");

    if (data) {
      const formatted = data.map(item => ({
        value: item.username,
        label: item.name
      }));
      setPeoples(formatted);
    }
  }

  useEffect(() => {
    fetchPeoples();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const oldData = getStorage("listTransactions");

    const newData = {
      id: Date.now(),
      category: "debt",
      title: data.title,
      creditor: data.creditor,
      debtor: data.debtor,
      date: data.date,
      amount: Number(data.amount),
      paidStatus: false
    };

    const updated = [...oldData, newData];
    saveStorage("listTransactions", updated);
    addTransaction.reset();
    navigate("/lists");
  };

  const handleOpenModalAddPeople = () => {
    openModal("addPeople", {
      onConfirm: () => fetchPeoples(), // callback parent
    });
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-medium mb-4">Add Debt</h2>
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
          <FormSelect
            name="creditor"
            label="Creditor"
            options={peoples}
            placeholder="Find who owes you"
            onOpenModal={() => handleOpenModalAddPeople()}
          />
          <FormSelect
            name="debtor"
            label="Debtor"
            options={peoples}
            placeholder="Find who you owe to"
            onOpenModal={() => handleOpenModalAddPeople()}
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
  );
}

export default AddDebtTransaction