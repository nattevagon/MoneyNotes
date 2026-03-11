import { useEffect, useState } from "react";
import { formatDate } from "@/helper/formatDate";
import { CheckBadgeIcon, ClipboardDocumentIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@/components/atoms/Button";

const ConfirmWithDetail = ({ data: dataProps, onConfirm, onClose }) => {
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
        {dataProps?.transaction && (
          <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer my-4" >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-lg text-white">{dataProps?.transaction?.title}</p>
                <p className="text-sm text-gray-400">{formatDate(dataProps?.transaction?.date)}</p>
                {dataProps?.transaction?.category === "debt" && (
                  <p className="text-sm text-gray-400">Debt {dataProps?.transaction?.debtor?.label} to {dataProps?.transaction?.creditor?.label}</p>
                )}
              </div>
              <div>
                <div className="text-1xl font-medium">Rp {dataProps?.admin?.username === dataProps?.transaction?.debtor?.value ? '-' : ''}{dataProps?.transaction?.amount?.toLocaleString("id-ID")}</div>
                {dataProps?.transaction?.category === "debt" && (
                  <p className={"text-sm text-right" + (dataProps?.transaction?.paidStatus ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{dataProps?.transaction?.paidStatus ? "Paid" : "Unpaid"}</p>
                )}
                {dataProps?.transaction?.category === "pocket" && (
                  <p className={"text-sm text-right" + (dataProps?.transaction?.creditor ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{dataProps?.transaction?.creditor ? "Income" : "Outcome"}</p>
                )}
              </div>
            </div>
          </div>
        )}
        {dataProps?.account && (
          <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer my-4" >
            <p className="text-lg text-white">{dataProps?.account?.name?.label}</p>
            <p className="text-sm text-gray-400">{dataProps?.account?.bank?.label}</p>
            <p className="text-xl text-white">{dataProps?.account?.accountNumber}</p>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          {dataProps?.type === 'delete' && (
            <Button
              category="primary"
              onClick={onConfirm}
            >
              <TrashIcon className="w-5 h-5 inline-block mr-2" />
              <p className="inline-block">Delete</p>
            </Button>
          )}
          {dataProps?.type === 'finish' && (
            <Button
              category="primary"
              onClick={onConfirm}
            >
              <CheckBadgeIcon className="w-5 h-5 inline-block mr-2" />
              <p className="inline-block">Finish</p>
            </Button>
          )}
          <Button
            category="secondary"
            onClick={onClose}
          >
            <XMarkIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Cancel</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmWithDetail