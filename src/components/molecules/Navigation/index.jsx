import { ChartPieIcon, HomeIcon, PlusIcon, QueueListIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from "react-router-dom";
import { getStorage } from "@/helper/localStorage";
import { useModal } from "@/context/ModalContext";

const Navigation = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const findAdmin = () => {
    const data = getStorage("peoples");
    return data.find(item => item.role === "admin");
  }

  const handleOpenModalChoose = () => {
    if (findAdmin()) {
      openModal("chooseTypeTransaction");
    } else {
      const item = {
        type: 'admin'
      }
      openModal("addPerson", {
        data: item,
        onConfirm: () => navigate(0),
      });
    }
  }
  return (
    <nav className="fixed bottom-0 left-0 right-0">
      <div className="bg-[#262628] text-white px-8 pt-6 pb-8 shadow-lg border-t-1 border-[#3d3d40]">
        <ul className="flex gap-4 justify-between">
          <li className="flex items-center justify-center">
            <Link to="/" className="hover:text-[#3d3d40] p-2 rounded">
              <HomeIcon className="w-6 h-6 inline-block" />
            </Link>
          </li>
          <li className="flex items-center justify-center bg-linear-to-r from-[#052f66] to-[#065084] text-white rounded-full">
            <div className="hover:text-[#3d3d40] p-2 rounded cursor-pointer" onClick={() => handleOpenModalChoose()}>
              <PlusIcon className="w-6 h-6 inline-block" />
            </div>
          </li>
          <li className="flex items-center justify-center">
            <Link to="/lists" className="hover:text-[#3d3d40] p-2 rounded">
              <QueueListIcon className="w-6 h-6 inline-block" />
            </Link>
          </li>
          {/* <li>
            <a href="/lists" className="hover:text-[#3d3d40] p-2 rounded">
              <ChartPieIcon className="w-6 h-6 inline-block" />
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation