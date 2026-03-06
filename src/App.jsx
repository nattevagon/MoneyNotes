import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Navigation from "./components/molecules/Navigation";
import Reports from "./pages/Reports";
import AddDebtTransaction from "./pages/AddDebtTransaction";
import AddPocketTransaction from "./pages/AddPocketTransaction";
import ChooseAddTypeTransaction from "./components/molecules/Modal/ChooseTypeAddTransaction";
import ConfirmFinishDebt from "./components/molecules/Modal/ConfirmFinishDebt";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/molecules/Modal/GlobalModal";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <main className="bg-[#1E201E] flex flex-col min-h-screen pb-20">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/add-debt-transaction" element={<AddDebtTransaction />} />
            <Route path="/add-pocket-transaction" element={<AddPocketTransaction />} />
            {/* <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<RecentActivity />} />
            <Route path="project/:id" element={<Project />} />
          </Route> */}
          </Routes>
        </main>
        <ChooseAddTypeTransaction />
        <Navigation />
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App
