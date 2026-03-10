import { useEffect, useState } from "react";
import { copyText } from "@/helper/copyText";
import { CheckBadgeIcon, ClipboardDocumentIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

const DetailAccount = ({ data: dataProps, onEdit, onDelete, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t)
  }, [])


  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300);
  }

  console.log('data', dataProps)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black transition-opacity duration-300
         ${visible ? "opacity-50" : "opacity-0"}`}
      />
      <div
        className={`relative w-full bg-[#141414] border-t-1 border-[#3d3d40] rounded-t-2xl px-6 pt-6 pb-10 transform transition-all duration-400
         ${visible ? "translate-y-0" : "translate-y-80"}`}
      >
        {dataProps && (
          <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40]" >
            <div>
              <p className="text-lg text-white">{dataProps?.name?.label}</p>
              <p className="text-sm text-gray-400">{dataProps?.bank?.label}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="text-1xl font-medium">{dataProps?.accountNumber}</div>
              <button className="flex aligns-center justify-center px-4 py-2 rounded-lg bg-[#262628] text-white border border-1 border-[#3d3d40] hover:bg-[#3d3d40] transition-colors cursor-pointer" onClick={() => copyText(dataProps?.accountNumber)}>
                <ClipboardDocumentIcon className="w-4 h-4 inline-block m-auto" />
              </button>
            </div>
          </div>
        )}
        <div className="flex items-stretch justify-between gap-4 mt-4">
          <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer flex items-center justify-center gap-2" onClick={onEdit}>
            <PencilSquareIcon className="w-5 h-5 inline-block" />
            <p className="inline-block">Edit</p>
          </button>
          <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer flex items-center justify-center gap-2" onClick={onDelete}>
            <TrashIcon className="w-5 h-5 inline-block" />
            <p className="inline-block">Delete</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailAccount