import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

const ChooseAddTypeTransaction = () => {
  return (
    <dialog id="chooseTypeAddTransaction" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg mb-4">What would you like to do transaction?</h3>
        <div className="flex justify-between gap-4">
          <Link to="/add-debt-transaction" className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={() => document.getElementById('chooseTypeAddTransaction').close()}>
            <CreditCardIcon className="w-full h-5 inline-block mr-2" />
            <p className="inline-block">Debt</p>
          </Link>
          <Link to="/add-pocket-transaction" className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" onClick={() => document.getElementById('chooseTypeAddTransaction').close()}>
            <BanknotesIcon className="w-full h-5 inline-block mr-2" />
            <p className="inline-block">Pocket</p>
          </Link>
        </div>
      </div>
    </dialog>
  )
}

export default ChooseAddTypeTransaction