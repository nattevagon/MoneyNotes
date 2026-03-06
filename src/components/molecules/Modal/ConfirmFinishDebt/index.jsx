import { useEffect, useState } from "react"
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { formatDate } from "@/helper/formatDate";

const ConfirmFinishDebt = ({ data, onConfirm, onClose }) => {
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
        <h3 className="font-bold text-lg">Really want to finish this debt?</h3>
        <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer my-4" >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-lg text-white">{data?.title}</p>
              <p className="text-sm text-gray-400">{formatDate(data?.date)}</p>
              {data?.category === "debt" && (
                <p className="text-sm text-gray-400">Debt {data?.debtor?.label} to {data?.creditor?.label}</p>
              )}
            </div>
            <div>
              <div className="text-1xl font-medium">Rp {data?.amount?.toLocaleString("id-ID")}</div>
              {data?.category === "debt" && (
                <p className={"text-sm text-right" + (data?.paidStatus ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{data?.paidStatus ? "Paid" : "Unpaid"}</p>
              )}
              {data?.category === "pocket" && (
                <p className={"text-sm text-right" + (data?.creditor ? " text-[#1bc45b]" : " text-[#da2a2a]")}>{data?.creditor ? "Income" : "Outcome"}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={onConfirm}>
            <CheckBadgeIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Finish</p>
          </button>
          <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmFinishDebt