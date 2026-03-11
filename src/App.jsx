import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Navigation from "./components/molecules/Navigation";
import Reports from "./pages/Reports";
import FormDebtTransaction from "./pages/FormDebtTransaction";
import FormPocketTransaction from "./pages/FormPocketTransaction";
import ChooseFormTypeTransaction from "./components/molecules/Modal/ChooseTypeTransaction";
import ConfirmFinishDebt from "./components/molecules/Modal/ConfirmFinishDebt";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/molecules/Modal/GlobalModal";
import PersonDebt from "./pages/PersonDebt";
import Accounts from "./pages/Accounts";
import FormAccount from "./pages/FormAccount";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <main className="bg-[#141414] flex flex-col min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/debt-transaction/:type/:id?" element={<FormDebtTransaction />} />
            <Route path="/pocket-transaction/:type/:id?" element={<FormPocketTransaction />} />
            <Route path="/person-debt/:id" element={<PersonDebt />} />
            <Route path="/account" element={<Accounts />} />
            <Route path="/account/:type/:id?" element={<FormAccount />} />
          </Routes>
        </main>
        <Navigation />
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App
