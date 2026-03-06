import { useEffect, useState } from "react"
import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

const ChooseAddTypeTransaction = ({ onClose }) => {
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
        <h3 className="font-bold text-lg mb-4">
          What would you like to do transaction?
        </h3>

        <div className="flex justify-between gap-4">
          <Link
            to="/add-debt-transaction"
            onClick={handleClose}
            className="w-full bg-[#262628] text-white rounded-lg p-4 border border-[#3d3d40] hover:bg-[#44444E] transition-colors text-center"
          >
            <CreditCardIcon className="w-full h-5 inline-block mr-2" />
            <p className="inline-block">Debt</p>
          </Link>

          <Link
            to="/add-pocket-transaction"
            onClick={handleClose}
            className="w-full bg-[#262628] text-white rounded-lg p-4 border border-[#3d3d40] hover:bg-[#44444E] transition-colors text-center"
          >
            <BanknotesIcon className="w-full h-5 inline-block mr-2" />
            <p className="inline-block">Pocket</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChooseAddTypeTransaction