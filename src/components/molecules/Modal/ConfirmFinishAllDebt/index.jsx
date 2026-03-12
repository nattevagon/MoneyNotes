import { useEffect, useState } from "react";
import { CheckBadgeIcon, ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import Button from "@/components/atoms/Button";
import { formatCurrency } from "@/helper/formatCurrency";
import { copyText } from "@/helper/copyText";
import { useToast } from "@/context/ToastContext";

const ConfirmFinishAllDebt = ({ data: dataProps, onConfirm, onCopy, onClose }) => {
  const [visible, setVisible] = useState(false);
    const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const handleCopyText = (value) => {
    copyText(value);
    showToast("Copied to clipboard!");
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
        ${visible ? "translate-y-0 opacity-100" : "translate-y-60 opacity-0"}`}
      >
        <h3 className="font-bold text-lg mb-4">{dataProps?.title}</h3>
        {dataProps?.allDebt && (
          <div className="relative w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] my-4" >

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-md">Recipient</p>
                <p className="font-medium text-md">{dataProps?.allDebt?.recipient}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-md">Total amount</p>
                <p className="font-medium text-md">{formatCurrency(Math.abs(dataProps?.allDebt?.totalAmount))}</p>
              </div>
            </div>
          </div>
        )}
        {(dataProps?.allDebt?.recipientAccounts && dataProps?.allDebt?.recipientAccounts.length > 0) && (
          <div className="relative w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] my-4" >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center border-b-1 border-[#3d3d40] pb-4">
                <p className="font-medium text-md">Transfer to</p>
              </div>
              {dataProps?.allDebt?.recipientAccounts.map((item) => (
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-md">{item?.bank?.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-md">{item?.accountNumber}</p>
                    <ClipboardDocumentIcon className="w-5 h-5 inline-block cursor-pointer" onClick={() => handleCopyText(item?.accountNumber)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <Button
            category="primary"
            onClick={onConfirm}
          >
            <CheckBadgeIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Finish Debt</p>
          </Button>
          <Button
            category="secondary"
            onClick={onCopy}
          >
            <ClipboardDocumentIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Copy Details</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmFinishAllDebt;