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
        <main className="relative flex flex-col h-screen bg-[#141414] overflow-hidden">
          <AnimateRoute />
          <Navigation />
        </main>
        <GlobalModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;