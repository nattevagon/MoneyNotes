import { useForm, FormProvider } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "@/components/molecules/Form/FormInput";
import FormSelect from "@/components/molecules/Form/FormSelect";
import FormDatePicker from "@/components/molecules/Form/FormDatePicker";
import FormCurrency from "@/components/molecules/Form/FormCurrency";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { DivideIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const AddDebtTransaction = () => {
  const navigate = useNavigate();
  const addTransaction = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const addPeople = useForm();
  const [peoples, setPeoples] = useState([]);

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

  const onSubmitPeople = (data) => {
    console.log(data);
    const oldData = getStorage("peoples");

    const newData = {
      id: Date.now(),
      username: data.peopleName.toLowerCase().replace(/\s/g, ""),
      name: data.peopleName,
      role: "user"
    };

    const updated = [...oldData, newData];
    saveStorage("peoples", updated);
    addPeople.reset();
    fetchPeoples();
    document.getElementById('addPeopleModal').close();
  };

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
          <div className="flex gap-4 justify-between">
            <FormSelect
              name="creditor"
              label="Creditor"
              options={peoples}
              placeholder="Find who owes you"
            />
            <div
              className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer mt-6"
              onClick={() => document.getElementById('addPeopleModal').showModal()}
            >
              <PlusIcon className="w-4 h-4 inline-block m-auto" />
            </div>
          </div>
          <FormSelect
            name="debtor"
            label="Debtor"
            options={peoples}
            placeholder="Find who you owe to"
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
      <dialog id="addPeopleModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Add People</h3>
          <div>
            <FormProvider {...addPeople}>
              <form
                onSubmit={addPeople.handleSubmit(onSubmitPeople)}
                className="space-y-4"
              >
                <FormInput
                  name="peopleName"
                  label="Name"
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
  );
}

export default AddDebtTransaction