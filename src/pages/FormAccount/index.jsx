import { ArrowLeftIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getStorage, saveStorage } from "@/helper/localStorage";
import FormInput from "@/components/molecules/Form/FormInput";
import FormSelect from "@/components/molecules/Form/FormSelect";
import Button from "@/components/atoms/Button";
import FormNavigation from "@/components/molecules/FormNavigation";

const FormAccount = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const pageName = (type === 'add' ? 'Add' : 'Edit') + ' Account';
  const isPageAvailable = (type === 'add' || type === 'edit');
  const addAccount = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const [peoples, setPeoples] = useState([]);
  const [banks, setBanks] = useState([]);

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

  const fetchBanks = () => {
    const data = getStorage("banks");

    if (data) {
      const formatted = data.map(item => ({
        value: item.username,
        label: item.name
      }));
      setBanks(formatted);
    }
  }

  const findAdmin = () => {
    const data = getStorage("peoples");
    return data.find(item => item.role === "admin");
  }

  const fetchForm = (id) => {
    const data = getStorage("listAccounts");

    const dataFiltered = data.find(
      (item) => item?.id.toString() === id.toString()
    );

    console.log("filtered", dataFiltered);

    if (dataFiltered) {
      addAccount.reset({
        id: dataFiltered?.id,
        name: dataFiltered.name,
        bank: dataFiltered.bank,
        accountNumber: dataFiltered.accountNumber
      });
    }
  };

  useEffect(() => {
    fetchPeoples();
    fetchBanks();

    if (type === 'edit') {
      fetchForm(id);
    }
  }, []);

  const addData = (data) => {
    const oldData = getStorage("listAccounts");
    const newData = {
      id: Date.now(),
      name: data.name,
      bank: data.bank,
      accountNumber: data.accountNumber
    };

    const updated = [...oldData, newData];
    saveStorage("listAccounts", updated);
  }

  const editData = (data) => {
    const oldData = getStorage("listAccounts");
    const updated = oldData.map((item) =>
      item.id.toString() === id.toString()
        ? {
          ...item,
          name: data.name,
          bank: data.bank,
          accountNumber: data.accountNumber,
        }
        : item
    );
    saveStorage("listAccounts", updated);
  }

  const onSubmit = (data) => {
    console.log(data);
    if (type === 'add') {
      addData(data);
    } else if (type === 'edit') {
      editData(data);
    }
    addAccount.reset();
    navigate("/account");
  };

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

  const handleAddBank = (value) => {
    const oldData = getStorage("banks") || [];

    const code = value
      .toLowerCase()
      .replace(/\s/g, "");

    // cek apakah sudah ada
    const isExist = oldData.some(
      (item) => item.code === code
    );

    if (isExist) {
      alert("Banks already exists");
      return;
    }

    const newData = {
      id: Date.now(),
      code,
      name: value
    };

    const updated = [...oldData, newData];
    saveStorage("banks", updated);
    fetchBanks();
  };

  if (type === 'edit') {
    console.log('edit', id)
  }

  return (
    isPageAvailable && (
      <div className="px-6 py-8">
        <div className="flex gap-4 justify-between mb-2">
          <div className="flex gap-4 justify-between mb-2">
            <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="w-4 h-4 inline-block m-auto" />
            </button>
            <h2 className="text-2xl font-medium">{pageName}</h2>
          </div>
          {/* <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
          <TrashIcon className="w-6 h-6 inline-block m-auto" />
        </button> */}
        </div>
        <div className="mt-4">
          <FormProvider {...addAccount}>
            <form
              onSubmit={addAccount.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormSelect
                name="name"
                label="Name"
                options={peoples}
                placeholder="Type a name"
                onAddItem={(value) => handleAddPerson(value)}
                rules={{ required: "Select is required" }}
              />
              <FormSelect
                name="bank"
                label="Bank"
                options={banks}
                placeholder="Find your bank"
                onAddItem={(value) => handleAddBank(value)}
                rules={{ required: "Select is required" }}
              />
              <FormInput
                name="accountNumber"
                label="Account Number"
                type="number"
                placeholder="Place a Account Number"
                inputMode="numeric"
                rules={{ required: "Account number is required" }}
              />
              <FormNavigation>
                <Button
                  category="primary"
                  type="submit"
                >
                  Save
                </Button>
              </FormNavigation>
            </form>
          </FormProvider>
        </div>
      </div>
    )
  )
}

export default FormAccount