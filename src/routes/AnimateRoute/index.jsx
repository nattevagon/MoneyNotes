import { Route, Routes, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Lists from "@/pages/Lists";
import Reports from "@/pages/Reports";
import FormDebtTransaction from "@/pages/FormDebtTransaction";
import FormPocketTransaction from "@/pages/FormPocketTransaction";
import PersonDebt from "@/pages/PersonDebt";
import Accounts from "@/pages/Accounts";
import FormAccount from "@/pages/FormAccount";
import PageTransition from "@/layouts/PageTransition";
import { AnimatePresence } from "framer-motion";

const AnimateRoute = () => {
    const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/lists" element={
          <PageTransition>
            <Lists />
          </PageTransition>
        } />
        <Route path="/reports" element={
          <PageTransition>
            <Reports />
          </PageTransition>
        } />
        <Route path="/debt-transaction/:type/:id?" element={
          <PageTransition>
            <FormDebtTransaction />
          </PageTransition>
        } />
        <Route path="/pocket-transaction/:type/:id?" element={
          <PageTransition>
            <FormPocketTransaction />
          </PageTransition>
        } />
        <Route path="/person-debt/:id" element={
          <PageTransition>
            <PersonDebt />
          </PageTransition>
        } />
        <Route path="/account" element={
          <PageTransition>
            <Accounts />
          </PageTransition>
        } />
        <Route path="/account/:type/:id?" element={
          <PageTransition>
            <FormAccount />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimateRoute