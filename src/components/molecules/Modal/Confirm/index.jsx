import { useEffect, useState } from "react";
import { formatDate } from "@/helper/formatDate";
import { CheckBadgeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Confirm = ({ data: dataProps, onConfirm, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black transition-opacity duration-300
        ${visible ? "opacity-50" : "opacity-0"}`}
      />
      <div
        className={`relative w-full bg-[#141414] border-t-1 border-[#3d3d40] rounded-t-2xl px-6 pt-6 pb-10 transform transition-all duration-300
        ${visible ? "translate-y-0" : "translate-y-60"}`}
      >
        <h3 className="font-bold text-lg mb-4">{dataProps?.title}</h3>
        {dataProps?.transactions && (
          <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer my-4" >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-lg text-white">{dataProps?.transactions?.title}</p>
                <p className="text-sm text-gray-400">{formatDate(dataProps?.transactions?.date)}</p>
                {dataProps?.transactions?.category === "debt" && (
                  <p className="text-sm text-gray-400">Debt {dataProps?.transactions?.debtor?.label} to {dataProps?.transactions?.creditor?.label}</p>
                )}
              </div>
              <div>
                <div className="text-1xl font-medium">Rp {dataProps?.admin?.username === dataProps?.transactions?.debtor?.value ? '-' : ''}{dataProps?.transactions?.amount?.toLocaleString("id-ID")}</div>
                {dataProps?.transactions?.category === "debt" && (
                  <p className={"text-sm text-right" + (dataProps?.transactions?.paidStatus ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{dataProps?.transactions?.paidStatus ? "Paid" : "Unpaid"}</p>
                )}
                {dataProps?.transactions?.category === "pocket" && (
                  <p className={"text-sm text-right" + (dataProps?.transactions?.creditor ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{dataProps?.transactions?.creditor ? "Income" : "Outcome"}</p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          {dataProps?.type === 'delete' && (
            <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={onConfirm}>
              <TrashIcon className="w-5 h-5 inline-block mr-2" />
              <p className="inline-block">Delete</p>
            </button>
          )}
          {dataProps?.type === 'finish' && (
            <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={onConfirm}>
              <CheckBadgeIcon className="w-5 h-5 inline-block mr-2" />
              <p className="inline-block">Finish</p>
            </button>
          )}
          <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirm