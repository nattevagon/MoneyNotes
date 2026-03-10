import { ArrowLeftIcon, ClipboardDocumentIcon, PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, saveStorage } from "@/helper/localStorage";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";

const Accounts = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [listAccount, setListAccount] = useState([]);

  const fetchListAccount = () => {
    const data = getStorage("listAccounts");

    setListAccount(data);
  }

  useEffect(() => {
    fetchListAccount();
  }, []);

  const handleRemoveAccount = (id) => {
    const oldData = getStorage("listAccounts") || [];
    const updated = oldData.filter(item => item?.id !== id);

    saveStorage("listAccounts", updated);
    fetchListAccount();
  };

  const handleClearThisAccount = (item) => {
    openModal("confirmWithDetail", {
      data: {
        type: 'delete',
        title: 'Delete this data account?',
        desc: '',
        account: item
      },
      onConfirm: () => {
        handleRemoveAccount(item?.id);
      }
    });
  }

  const handleOpenDetail = (item) => {
    openModal("detailAccount", {
      data: item,
      onEdit: () => navigate('/account/edit/' + item?.id),
      onDelete: () => handleClearThisAccount(item)
    });
  }

  console.log('list accounts', listAccount)

  return (
    <div className="px-6 py-8">
      <div className="flex gap-4 justify-between mb-2">
        <div className="flex gap-4 justify-between mb-2">
          <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-4 h-4 inline-block m-auto" />
          </button>
          <h2 className="text-2xl font-medium">Accounts</h2>
        </div>
        {/* <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer">
          <TrashIcon className="w-6 h-6 inline-block m-auto" />
        </button> */}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">List person account</h2>
        <div className="mt-2">
          <div className="grid grid-cols-1 gap-4">
            {listAccount?.map((item) => (
              <div
                key={item?.id}
                className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer flex flex-col gap-[2px]"
                onClick={() => handleOpenDetail(item)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-medium text-white">{item?.name?.label}</p>
                  {/* <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => copyText(item?.accountNumber)}>
                    <TrashIcon className="w-4 h-4 inline-block m-auto" />
                  </button> */}
                </div>
                <p className="text-sm text-gray-400">{item?.bank?.label}</p>
                <p className="text-xl text-white">{item?.accountNumber}</p>
              </div>
            ))}
            <Link to="/account/add" className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
              <PlusIcon className="w-6 h-6 inline-block m-auto" />
              <p className="text-center">Add account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts