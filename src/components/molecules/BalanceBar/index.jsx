import Button from "@/components/atoms/Button";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
// import Account from "../Account";

const getAdminBalance = (transactions, adminUsername) => {
  if (transactions && adminUsername) {
    return transactions?.reduce((balance, item) => {
      if ((item.category === "debt" && item.paidStatus === false) || item.category === "pocket") {
        if (item.creditor?.value === adminUsername) {
          return balance + item.amount;
        }

        if (item.debtor?.value === adminUsername) {
          return balance - item.amount;
        }
      }

      return balance;
    }, 0);
  }
};

const BalanceBar = ({ transactions, admin }) => {
  const balance = getAdminBalance(transactions, admin?.username);
  console.log('balance', admin)

  return (
    <div className="p-4 bg-linear-to-r from-[#090040] to-[#065084] text-white rounded-lg mb-4 border border-1 border-[#3d3d40]">
      <h2 className="mb-2">Current Balance</h2>
      <p className="text-2xl font-medium">Rp {balance?.toLocaleString("id-ID") || '0'}</p>
      {/* {admin?.username && (
        <div className="mt-4">
          <Account username={admin?.username} />
        </div>
      )} */}
      <div className="mt-4">
        <Link to={"/account?username=" + admin?.username}>
          <Button
            className="flex items-center justify-center gap-2"
            category="primary"
          >
            <IdentificationIcon className="w-5 h-5 inline-block mr-2" />
            <p className="inline-block">Show account</p>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default BalanceBar