import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid"

const ConfirmDelete = ({ onConfirm, onClose }) => {
  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Really want to delete this transaction?</h3>
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
    </dialog>
  )
}

export default ConfirmDelete