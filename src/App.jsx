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
        <div className="flex flex-col h-screen bg-[#141414] overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-20">
            <AnimateRoute />
          </main>
          <Navigation />
        </div>
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;