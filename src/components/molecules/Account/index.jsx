import { useEffect, useState } from 'react';
import Button from "@/components/atoms/Button";
import { getStorage } from "@/helper/localStorage";
import { EyeIcon } from "@heroicons/react/24/solid";

const Account = ({ username }) => {
  const [accountData, setAccountData] = useState([]);

  const fetchAccount = () => {
    const data = getStorage("listAccounts");
    const dataFilter = data.filter(item => item?.name?.value === username);

    console.log('data accountku', dataFilter)

    setAccountData(dataFilter);
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className="w-full bg-[#262628] text-white rounded-lg px-4 py-2 border border-1 border-[#3d3d40]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          {accountData && accountData?.map((item) => (
            <div key={item?.id} className="flex items-center gap-2">
              <p className="text-lg text-white">{item?.bank?.label}</p>
              <p className="text-lg text-white">{item?.accountNumber}</p>
            </div>
          ))}
        </div>
        <div>
          <EyeIcon className="w-full h-5 inline-block" />
        </div>
      </div>
    </div>
  )
}

export default Account;