import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Reports from "./pages/Reports";
import FormDebtTransaction from "./pages/FormDebtTransaction";
import FormPocketTransaction from "./pages/FormPocketTransaction";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/molecules/Modal/GlobalModal";
import PersonDebt from "./pages/PersonDebt";
import Accounts from "./pages/Accounts";
import FormAccount from "./pages/FormAccount";
import MainLayout from "./layouts/MainLayout";
import NavLayout from "./layouts/NavLayout";
import { ToastProvider } from "./context/ToastContext";

function LayoutWithNav() {
  return (
    <NavLayout>
      <Outlet />
    </NavLayout>
  );
}

function LayoutWithoutNav() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ToastProvider>
          <Routes>
            <Route element={<LayoutWithNav />}>
              <Route path="/" element={<Home />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/person-debt/:id" element={<PersonDebt />} />
              <Route path="/account" element={<Accounts />} />
            </Route>
            <Route element={<LayoutWithoutNav />}>
              <Route path="/account/:type/:id?" element={<FormAccount />} />
              <Route path="/debt-transaction/:type/:id?" element={<FormDebtTransaction />} />
              <Route path="/pocket-transaction/:type/:id?" element={<FormPocketTransaction />} />
            </Route>
          </Routes>
          <GlobalModal />
        </ToastProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App
