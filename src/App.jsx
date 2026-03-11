import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/molecules/Navigation";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/molecules/Modal/GlobalModal";
import AnimateRoute from "./routes/AnimateRoute";
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <main className="bg-[#141414] flex flex-col min-h-screen pb-20 overflow-hidden">
          <AnimateRoute />
        </main>
        <Navigation />
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App
