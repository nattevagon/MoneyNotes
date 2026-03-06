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

  console.log('admin', admin);
  console.log('transactions', transactions);
  console.log('balance', balance);

  return (
    <div className="px-4 py-6 bg-linear-to-r from-[#090040] to-[#065084] text-white rounded-lg mb-4 border border-1 border-[#3d3d40]">
      <h2 className="mb-2">Current Balance</h2>
      <p className="text-2xl font-medium">Rp {balance?.toLocaleString("id-ID") || '0'}</p>
    </div>
  )
}

export default BalanceBar