import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"

const ConfirmDelete = ({ onConfirm, onClose }) => {
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
        className={`relative w-full bg-[#141414] border-1 border-[#3d3d40] rounded-t-2xl p-6 transform transition-all duration-300
        ${visible ? "translate-y-0" : "translate-y-60"}`}
      >
        <h3 className="font-bold text-lg mb-4">Really want to delete all transactions?</h3>
        <div className="flex items-center justify-between gap-4">
          <button className="bg-[#262628] w-full text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={onConfirm}>
            <TrashIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Delete</p>
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

export default ConfirmDelete