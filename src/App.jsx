import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Navigation from "./components/molecules/Navigation";
import Reports from "./pages/Reports";
import AddDebtTransaction from "./pages/AddDebtTransaction";
import AddPocketTransaction from "./pages/AddPocketTransaction";
import ChooseAddTypeTransaction from "./components/molecules/Modal/ChooseTypeTransaction";
import ConfirmFinishDebt from "./components/molecules/Modal/ConfirmFinishDebt";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/molecules/Modal/GlobalModal";
import PersonDebt from "./pages/PersonDebt";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <main className="bg-[#141414] flex flex-col min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/add-debt-transaction" element={<AddDebtTransaction />} />
            <Route path="/add-pocket-transaction" element={<AddPocketTransaction />} />
            <Route path="/person-debt/:id" element={<PersonDebt />} />
          </Routes>
        </main>
        <Navigation />
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App
