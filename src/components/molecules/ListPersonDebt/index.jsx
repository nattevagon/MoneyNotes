import { formatDate } from "@/helper/formatDate";
import { Link } from "react-router-dom";

const ListPersonDebt = ({ transactions, admin }) => {
  const transactionsByPeople = transactions
    .filter(
      (item) =>
        item.category === "debt" &&
        item.paidStatus === false &&
        (
          item.creditor?.value === admin?.username ||
          item.debtor?.value === admin?.username
        )
    )
    .reduce((result, item) => {
      const isAdminCreditor = item.creditor?.value === admin?.username;

      const people = isAdminCreditor ? item.debtor : item.creditor;

      if (!people) return result;

      if (!result[people.value]) {
        result[people.value] = {
          name: people.label,
          username: people.value,
          totalDebt: 0
        };
      }

      if (isAdminCreditor) {
        // orang lain berhutang ke admin
        result[people.value].totalDebt += item.amount;
      } else {
        // admin berhutang ke orang lain
        result[people.value].totalDebt -= item.amount;
      }

      return result;
    }, {});

  const peopleList = Object.values(transactionsByPeople);
  console.log('transactionsByPeople', peopleList);

  return (
    <div className="flex flex-col gap-4">
      {peopleList.length > 0 ?
        peopleList?.map((item) => (
          <Link to={'/person-debt/' + item?.username} key={item.name} className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-lg text-white">{item?.name}</p>
                {/* <p className="text-sm text-gray-400">{formatDate(item?.date)}</p>
                {item?.category === "debt" && (
                  <p className="text-sm text-gray-400">Pay from {item?.debtor?.label} to {item?.creditor?.label}</p>
                )}
                {item?.category === "pocket" && (
                  <p className="text-sm text-gray-400">{item?.creditor ? "Income" : "Outcome"}</p>
                )} */}
              </div>
              <div>
                <div className="text-1xl font-medium">Rp {item?.totalDebt?.toLocaleString("id-ID")}</div>
              </div>
            </div>
          </Link>
        )) : (
          <div className="w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40]">
            <p className="text-gray-400">No transactions found.</p>
          </div>
        )}
    </div>
  )
}

export default ListPersonDebt