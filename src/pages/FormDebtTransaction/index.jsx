import { useForm, FormProvider } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "@/components/molecules/Form/FormInput";
import FormSelect from "@/components/molecules/Form/FormSelect";
import FormDatePicker from "@/components/molecules/Form/FormDatePicker";
import FormCurrency from "@/components/molecules/Form/FormCurrency";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const FormDebtTransaction = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const addTransaction = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const pageName = (type === 'add' ? 'Add' : 'Edit') + ' Debt';
  const isPageAvailable = (type === 'add' || type === 'edit');
  const { watch, setValue } = addTransaction;
  const creditor = watch("creditor");
  const debtor = watch("debtor");
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

  const findAdmin = () => {
    const data = getStorage("peoples");
    return data.find(item => item.role === "admin");
  }

  const fetchForm = (id) => {
    const data = getStorage("listTransactions");

    const dataFiltered = data.find(
      (item) => item?.id.toString() === id.toString()
    );

    console.log('dataFiltered', dataFiltered)

    if (dataFiltered) {
      addTransaction.reset({
        id: dataFiltered?.id,
        category: "debt",
        title: dataFiltered?.title,
        creditor: dataFiltered?.creditor,
        debtor: dataFiltered?.debtor,
        date: dataFiltered?.date,
        amount: Number(dataFiltered?.amount),
        paidStatus: dataFiltered.paidStatus
      });
    }
  };

  useEffect(() => {
    fetchPeoples();

    if (type === 'edit') {
      fetchForm(id);
    }
  }, []);

  const addData = (data) => {
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
  }

  const editData = (data) => {
    const oldData = getStorage("listTransactions");
    const updated = oldData.map((item) =>
      item.id.toString() === id.toString()
        ? {
          ...item,
          title: data.title,
          creditor: data.creditor,
          debtor: data.debtor,
          date: data.date,
          amount: Number(data.amount),
        }
        : item
    );
    saveStorage("listTransactions", updated);
  }

  const onSubmit = (data) => {
    if (type === 'add') {
      addData(data);
    } else if (type === 'edit') {
      editData(data);
    }
    addTransaction.reset();
    navigate("/lists");
  };

  // AUTO FILL DEBTOR
  useEffect(() => {
    const admin = findAdmin();
    if (admin && creditor && creditor.value !== admin?.username) {
      setValue("debtor", {
        value: admin?.username,
        label: admin?.name
      });
    }
  }, [creditor, setValue]);

  // AUTO FILL CREDITOR
  useEffect(() => {
    const admin = findAdmin();
    if (admin && debtor && debtor.value !== admin?.username) {
      setValue("creditor", {
        value: admin?.username,
        label: admin?.name
      });
    }
  }, [debtor, setValue]);

  useEffect(() => {
    if (
      creditor &&
      debtor &&
      creditor.value === debtor.value
    ) {
      setValue("debtor", null);
    }
  }, [creditor, debtor, setValue]);

  const handleAddPerson = (value) => {
    const oldData = getStorage("peoples") || [];

    const username = value
      .toLowerCase()
      .replace(/\s/g, "");

    // cek apakah sudah ada
    const isExist = oldData.some(
      (item) => item.username === username
    );

    if (isExist) {
      alert("Person already exists");
      return;
    }

    const newData = {
      id: Date.now(),
      username,
      name: value,
      role: "user"
    };

    const updated = [...oldData, newData];
    saveStorage("peoples", updated);
    fetchPeoples();
  };

  console.log('type', type)

  return (
    isPageAvailable && (
      <div className="px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-4 h-4 inline-block m-auto" />
          </button>
          <h2 className="text-2xl font-medium">{pageName}</h2>
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
              rules={{ required: "Title is required" }}
            />
            <FormSelect
              name="creditor"
              label="Creditor"
              options={peoples}
              placeholder="Find who owes you"
              onAddItem={(value) => handleAddPerson(value)}
              rules={{ required: "Select is required" }}
            />
            <FormSelect
              name="debtor"
              label="Debtor"
              options={peoples}
              placeholder="Find who you owe to"
              onAddItem={(value) => handleAddPerson(value)}
              rules={{ required: "Select is required" }}
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
              rules={{
                required: "Amount is required",
                validate: (value) =>
                  Number(value) > 0 || "Amount must over than 0"
              }}
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

export default FormDebtTransaction